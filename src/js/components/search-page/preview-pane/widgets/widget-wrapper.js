import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';

import { CallToActionWidget } from './index';
import { wrapperStyle, responsiveContainerStyle, gradientStyle } from './widget-wrapper.style';


export default class WidgetWrapper extends Component {
  render() {
    const { maxHeight, callToAction } = this.props;
    const { to, url, text } = callToAction;
    return (
      <div className={ this.props.className } style={ wrapperStyle }>
        <div style={ responsiveContainerStyle }>
          { this.props.children }
          <MediaQuery maxHeight={ maxHeight }>
            <div className='test--gradient' style={ gradientStyle }/>
          </MediaQuery>
        </div>
        <CallToActionWidget to={ to } url={ url } text={ text }/>
      </div>
    );
  }
}

WidgetWrapper.defaultProps = {
  className: '',
  callToAction: {},
  maxHeight: 990
};

WidgetWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).string,
  callToAction: PropTypes.object,
  maxHeight: PropTypes.number
};
