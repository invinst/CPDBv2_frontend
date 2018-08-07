import React, { Component, PropTypes } from 'react';
import { map, isEqual, find } from 'lodash';

import { columnWrapperStyle, headerStyle, itemsWrapperStyle } from './category-column.style';
import CategoryItem from './category-item';


export default class CategoryColumn extends Component {

  shouldComponentUpdate(nextProps) {
    const rerender = this.focusKey(this.props) !== this.focusKey(nextProps) ||
      !isEqual(this.props.items, nextProps.items) ||
      this.props.name != nextProps.name ||
      this.props.index != nextProps.index;
    return rerender;
  }

  focusKey(props) {
    const { name, items, focusedItem } = props;
    const headerUniqueKey = `category-${name}`;
    if (focusedItem.uniqueKey === headerUniqueKey) {
      return focusedItem.uniqueKey;
    }
    const item = find(items, obj => {
      const key = `${name}-${obj.id}`;
      return key === focusedItem.uniqueKey;
    });
    if (item) {
      return focusedItem.uniqueKey;
    }
    return null;
  }

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
              />
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div style={ columnWrapperStyle } className='test--category-column'>
        <div
          style={ headerStyle }
          className='test--category-header'
        >
          { this.props.name }
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
