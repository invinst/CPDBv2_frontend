import React, { PropTypes, Component } from 'react';
import { map, chunk } from 'lodash';

import { columnWrapperStyle, headerStyle, itemsWrapperStyle } from './category-column.style';
import CategoryItem from './category-item';


export default class CategoryColumn extends Component {

  onGetRef(el) {
    this.element = el;
  }

  renderItems() {
    const { items, expandedId, toggleExpanded, focusedItem } = this.props;

    return (
      <div style={ itemsWrapperStyle } ref={ this.onGetRef.bind(this) }>
        {
          map(items, (item, index) => (
            <CategoryItem
              key={ index }
              item={ item }
              expanded={ expandedId === item.id }
              toggleExpanded={ toggleExpanded }
              isFocused={ focusedItem.uniqueKey === `${item.type}-${item.id}` }
            />
          ))
        }
      </div>
    );
  }

  render() {
    const { name } = this.props;

    return (
      <div style={ columnWrapperStyle } className='test--category-column'>
        <div style={ headerStyle } className='test--category-header'>{ name }</div>
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
