import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';

import CallToActionWidget from './call-to-action-widget';
import { wrapperStyle, responsiveContainerStyle, gradientStyle } from './widget-wrapper.style';
import WrapperLink from './wrapper-link';


export default class WidgetWrapper extends Component {
  render() {
    const { maxHeight, callToAction } = this.props;
    const { to, url, text } = callToAction;

    return (
      <WrapperLink url={ url } to={ to }>
        <div className={ this.props.className } style={ wrapperStyle }>
          <div style={ responsiveContainerStyle }>
            { this.props.children }
            <MediaQuery maxHeight={ maxHeight }>
              <div className='test--gradient' style={ gradientStyle }/>
            </MediaQuery>
          </div>
          <CallToActionWidget to={ to } url={ url } text={ text }/>
        </div>
      </WrapperLink>
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
  children: PropTypes.arrayOf(PropTypes.element),
  callToAction: PropTypes.object,
  maxHeight: PropTypes.number
};
