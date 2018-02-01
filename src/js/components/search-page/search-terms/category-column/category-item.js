import React, { PropTypes, Component } from 'react';

import ExpandMotion from 'components/animation/expand-motion';
import Hoverable from 'components/common/higher-order/hoverable';
import { itemStyle, nameStyle } from './category-item.style';
import CategoryItemContent from './category-item-content';


class CategoryItem extends Component {
  constructor(props) {
    super(props);

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    const { toggleExpanded, item } = this.props;

    toggleExpanded(item.id);
  }

  render() {
    const { item, expanded, hovering, isFocused } = this.props;

    return (
      <div style={ itemStyle(isFocused) } className='test--category-item'>
        <div
          onClick={ this.toggleExpanded }
          style={ nameStyle(expanded, hovering) }
          className='link--transition'>
          { item.name }
        </div>
        <ExpandMotion show={ expanded }>
          <CategoryItemContent item={ item }/>
        </ExpandMotion>
      </div>
    );
  }
}

CategoryItem.propTypes = {
  item: PropTypes.object,
  expanded: PropTypes.bool,
  hovering: PropTypes.bool,
  toggleExpanded: PropTypes.func,
  isFocused: PropTypes.bool,
};

CategoryItem.defaultProps = {
  item: {}
};

export default Hoverable(CategoryItem);
