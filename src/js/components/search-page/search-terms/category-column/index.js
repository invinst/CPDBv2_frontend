import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import classnames from 'classnames';

import { columnWrapperStyle, headerStyle, itemsWrapperStyle } from './category-column.style';
import CategoryItem from './category-item';
import CategorySubItem from './category-sub-item';


export default class CategoryColumn extends Component {

  onGetRef(el) {
    this.element = el;
  }

  renderItems() {
    const { items, focusedItem, name, handleItemClick } = this.props;

    return (
      <div style={ itemsWrapperStyle } ref={ this.onGetRef.bind(this) }>
        {
          map(items, (item, index) => {
            const uniqueKey = `${name}-${item.id}`;
            const isFocused = focusedItem.uniqueKey === uniqueKey;
            return (
              <CategoryItem
                key={ index }
                item={ item }
                itemUniqueKey={ uniqueKey }
                isFocused={ isFocused }
                handleItemClick={ handleItemClick }
              >
                { index === 0 && (
                  <div>
                    <CategorySubItem title={ '1st District' }/>
                    <CategorySubItem title={ '2nd District' }/>
                  </div>
                )}

              </CategoryItem>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { name, focusedItem, handleItemClick } = this.props;
    const headerUniqueKey = `category-${name}`;
    const isFocusedHeader = focusedItem.uniqueKey === headerUniqueKey;

    return (
      <div style={ columnWrapperStyle } className='test--category-column'>
        <div
          style={ headerStyle(isFocusedHeader) }
          onClick={ () => handleItemClick(headerUniqueKey) }
          className={
            classnames('term-item', 'test--category-header', { 'focused': isFocusedHeader })
          }
        >
          { name }
        </div>
        {
          this.renderItems()
        }
      </div>
    );
  }
}

CategoryColumn.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string,
  index: PropTypes.number,
  focusedItem: PropTypes.object,
  handleItemClick: PropTypes.func,
};

CategoryColumn.defaultProps = {
  focusedItem: {
    uniqueKey: null
  }
};
