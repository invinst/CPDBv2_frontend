import React, { Component, PropTypes } from 'react';

import { wrapperStyle } from './widget-wrapper.style';


export default class WidgetWrapper extends Component {
  render() {
    return (
      <div className={ this.props.className } style={ wrapperStyle }>
        { this.props.children }
      </div>
    );
  }
}

WidgetWrapper.defaultProps = {
  className: ''
};

WidgetWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};
