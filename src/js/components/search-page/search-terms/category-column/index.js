import React, { PropTypes, Component } from 'react';
import { map, chunk } from 'lodash';

import { columnWrapperStyle, headerStyle, itemsWrapperStyle, itemsChunkWrapperStyle } from './category-column.style';
import CategoryItem from './category-item';


export default class CategoryColumn extends Component {
  componentDidMount() {
    const { selected, onSelected } = this.props;
    if (selected) {
      const { left } = this.element.getBoundingClientRect();
      onSelected(left);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && !this.props.selected) {
      const { left } = this.element.getBoundingClientRect();
      this.props.onSelected(left);
    }
  }

  onGetRef(el) {
    this.element = el;
  }

  renderItems() {
    const { items, expandedId, toggleExpanded } = this.props;

    return (
      <div style={ itemsWrapperStyle } ref={ this.onGetRef.bind(this) }>
        {
          map(chunk(items, 13), (itemsChunk, index) => (
            <div
              style={ itemsChunkWrapperStyle }
              key={ index }
              className='test--category-item-chunk'>
              {
                map(itemsChunk, (item, index) => (
                  <CategoryItem key={ index } item={ item }
                    expanded={ expandedId === item.id } toggleExpanded={ toggleExpanded }/>
                ))
              }
            </div>
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
  selected: PropTypes.bool,
  onSelected: PropTypes.func,
  expandedId: PropTypes.string,
  toggleExpanded: PropTypes.func
};
