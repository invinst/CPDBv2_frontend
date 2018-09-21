import React, { Component, PropTypes } from 'react';

import { containerStyle, buttonStyle, textStyle } from './view-widget.style';


export default class CallToActionWidget extends Component {
  render() {
    const { text } = this.props;

    return (
      <div style={ containerStyle }>
        <span style={ textStyle }>{ text }</span>
        <div style={ buttonStyle }>→</div>
      </div>
    );
  }
}

CallToActionWidget.defaultProps = {
  url: null,
  to: null,
  text: 'View on the Data Tool'
};

CallToActionWidget.propTypes = {
  url: PropTypes.string,
  to: PropTypes.string,
  text: PropTypes.string
};
