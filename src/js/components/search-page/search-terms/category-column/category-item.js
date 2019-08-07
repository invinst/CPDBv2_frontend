import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { reduce, get } from 'lodash';
import { browserHistory } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import { itemStyle, nameStyle } from './category-item.style';
import { navigationItemTransform } from 'selectors/common/navigation-item-transform';
import { CALL_TO_ACTION_TYPES } from 'utils/constants';
import { trackOutboundLink } from 'utils/google_analytics_tracking';


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

  handleItemClick(item) {
    item = navigationItemTransform(item);
    if (item.callToActionType === CALL_TO_ACTION_TYPES.VIEW_ALL) {
      browserHistory.push(item.to);
    } else if (item.callToActionType === CALL_TO_ACTION_TYPES.LINK) {
      trackOutboundLink(item.url, '_blank');
    }
  }

  render() {
    const { item, hovering, isFocused, itemUniqueKey } = this.props;
    const className = classnames(
      `term-item-${itemUniqueKey.replace(' ', '-')}`,
      'test--category-item'
    );

    return (
      <div>
        <div
          style={ itemStyle(isFocused) }
          className={ className }
          onClick={ this.handleItemClick.bind(this, item) }
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
  itemUniqueKey: PropTypes.string
};

CategoryItem.defaultProps = {
  item: {},
  isFocused: false,
  hovering: false,
  itemUniqueKey: ''
};

export default Hoverable(CategoryItem);
