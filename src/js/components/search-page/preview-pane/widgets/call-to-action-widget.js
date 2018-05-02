import React, { Component, PropTypes } from 'react';
import { containerStyle, buttonStyle, textStyle } from './view-widget.style';


export default class CallToActionWidget extends Component {
  render() {
    return (
      <div style={ containerStyle }>
        <span style={ textStyle }>{ this.props.text }</span>
        <a href={ this.props.url } style={ buttonStyle }>→</a>
      </div>
    );
  }
}

CallToActionWidget.defaultProps = {
  text: 'View on the Data Tool'
};

CallToActionWidget.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
};
