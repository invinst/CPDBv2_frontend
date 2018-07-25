import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { wrapperStyle, titleStyle, valueStyle } from './link-item.style';
import NavigationButton from './navigation-button';
import Hoverable from 'components/common/higher-order/hoverable';


class LinkItem extends Component {
  render() {
    const { title, value, navigationText, isLeft, hideBorder, hovering, to } = this.props;

    return (
      <Link
        className='test--link-item'
        to={ to }
        style={ wrapperStyle(isLeft, hideBorder) }
      >
        <div className='test--link-item-title' style={ titleStyle }>
          { title }
        </div>
        <div className='test--link-item-value' style={ valueStyle(hovering) }>
          { value }
          { navigationText && <NavigationButton text={ navigationText } hovering={ hovering }/> }
        </div>
      </Link>
    );
  }
}

LinkItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isLeft: PropTypes.bool,
  hideBorder: PropTypes.bool,
  to: PropTypes.string,
  navigationText: PropTypes.string,
  hovering: PropTypes.bool,
};

LinkItem.defaultProps = {
  hideBorder: false,
};

export default Hoverable(LinkItem);
