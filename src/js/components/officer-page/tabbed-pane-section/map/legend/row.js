import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { numberStyle, ovalStyle, textStyle, wrapperStyle } from './row.style';


class Row extends Component {

  render() {
    const { ovalColor, ovalBorderColor, text, number, haveMarginBottom, hovering } = this.props;
    return (
      <div style={ wrapperStyle(haveMarginBottom) } className='test--legend-row'>
        <div style={ ovalStyle(ovalColor, ovalBorderColor) } />
        <span style={ textStyle(hovering) } className='test--legend-row-text'>{ text }</span>
        <span style={ numberStyle } className='test--legend-row-number'>{ number }</span>
      </div>
    );
  }
}

Row.propTypes = {
  ovalColor: PropTypes.string,
  ovalBorderColor: PropTypes.string,
  text: PropTypes.string,
  number: PropTypes.number,
  haveMarginBottom: PropTypes.bool,
  hovering: PropTypes.bool,
};

export default Hoverable(Row);
