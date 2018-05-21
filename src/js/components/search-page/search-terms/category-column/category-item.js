import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { reduce, get } from 'lodash';

import Hoverable from 'components/common/higher-order/hoverable';
import { itemStyle, nameStyle } from './category-item.style';


export class CategoryItem extends Component {
  shouldComponentUpdate(nextProps) {
    const keys = [
      'hovering',
      'item.name',
      'isFocused',
      'itemUniqueKey'
    ];

    return reduce(keys, (memo, key) => (
      memo || get(nextProps, key) !== get(this.props, key)
    ), false);
  }

  render() {
    const { item, hovering, isFocused, handleItemClick, itemUniqueKey } = this.props;
    const className = classnames(
      `term-item-${itemUniqueKey.replace(' ', '-')}`,
      'test--category-item'
    );

    return (
      <div>
        <div
          style={ itemStyle(isFocused) }
          className={ className }
          onClick={ () => handleItemClick(itemUniqueKey) }
        >
          <div
            style={ nameStyle(isFocused, hovering) }
            className='link--transition'>
            { item.name }
          </div>
        </div>
      </div>
    );
  }
}

CategoryItem.propTypes = {
  item: PropTypes.object,
  hovering: PropTypes.bool,
  isFocused: PropTypes.bool,
  handleItemClick: PropTypes.func,
  itemUniqueKey: PropTypes.string
};

CategoryItem.defaultProps = {
  item: {},
  isFocused: false,
  hovering: false,
  itemUniqueKey: ''
};

export default Hoverable(CategoryItem);
