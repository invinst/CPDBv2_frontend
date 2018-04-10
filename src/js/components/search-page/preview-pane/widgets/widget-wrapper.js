import React, { Component, PropTypes } from 'react';

import { wrapperStyle } from './widget-wrapper.style';


export default class WidgetWrapper extends Component {
  render() {
    return (
      <div style={ wrapperStyle }>
        { this.props.children }
      </div>
    );
  }
}

WidgetWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired)
};
