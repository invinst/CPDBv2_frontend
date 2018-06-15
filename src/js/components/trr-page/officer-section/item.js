import React, { Component, PropTypes } from 'react';

import { wrapperStyle, titleStyle, valueStyle, subValueStyle } from './item.style';


export default class Item extends Component {
  render() {
    const { title, value, subValue, extraComponent, isLeft, hideBorder } = this.props;

    return (
      <div style={ wrapperStyle(isLeft, hideBorder) }>
        <div className='test--item-title' style={ titleStyle }>
          { title }
        </div>
        <div className='test--item-value' style={ valueStyle }>
          { value }
          { subValue && <span className='test--item-sub-value' style={ subValueStyle }>{ subValue }</span> }
          { extraComponent }
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  subValue: PropTypes.string,
  extraComponent: PropTypes.node,
  isLeft: PropTypes.bool,
  hideBorder: PropTypes.bool,
};

Item.defaultProps = {
  hideBorder: false,
};
