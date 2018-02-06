import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';
import classnames from 'classnames';

import { columnWrapperStyle, headerStyle, itemsWrapperStyle } from './category-column.style';
import CategoryItem from './category-item';


export default class CategoryColumn extends Component {

  onGetRef(el) {
    this.element = el;
  }

  renderItems() {
    const { items, expandedId, toggleExpanded, focusedItem, name } = this.props;

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
                expanded={ expandedId === item.id }
                toggleExpanded={ toggleExpanded }
                isFocused={ isFocused }
              />
            );
          })
        }
      </div>
    );
  }

  render() {
    const { name, focusedItem } = this.props;
    const headerUniqueKey = `category-${name}`;
    const isFocusedHeader = focusedItem.uniqueKey === headerUniqueKey;

    return (
      <div style={ columnWrapperStyle } className='test--category-column'>
        <div
          style={ headerStyle(isFocusedHeader) }
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
  expandedId: PropTypes.string,
  toggleExpanded: PropTypes.func,
  focusedItem: PropTypes.object,
};

CategoryColumn.defaultProps = {
  focusedItem: {
    uniqueKey: null
  }
};
