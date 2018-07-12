import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';

import { wrapperStyle, innerStyle, titleStyle, textStyle } from './popup.style';


export default class Popup extends Component {
  render() {
    const { text, title, style } = this.props;
    const tooltipId = `tooltip-${uuid()}`;
    return (
      <span>
        <ReactTooltip id={ tooltipId } effect='solid' type='light' className='popup' offset={ { top: -10 } }>
          <div style={ titleStyle }>{ title }</div>
          <div style={ textStyle }>{ text }</div>
        </ReactTooltip>
        <div style={ { ...wrapperStyle, ...style } } data-tip data-for={ tooltipId }>
          <span style={ innerStyle }>i</span>
        </div>
      </span>
    );
  }
}

Popup.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
};
