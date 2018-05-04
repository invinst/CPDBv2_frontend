import React, { Component, PropTypes } from 'react';

import { wrapperStyle, valueStyle, nameStyle, descriptionStyle } from './metric-pane.style';


export default class MetricPane extends Component {

  render() {
    const { value, name, description, borderTop, dashedBorder, highlightValue } = this.props;
    const active = value !== 0;

    return (
      <div style={ wrapperStyle(borderTop, dashedBorder) }>
        <div className='test--metrics-pane-value' style={ valueStyle(active, highlightValue) }>
          { value }
        </div>
        <div className='test--metrics-pane-name' style={ nameStyle(active) }>
          { name }
        </div>
        <div className='test--metrics-pane-description' style={ descriptionStyle }>
          { description }
        </div>
      </div>
    );
  }
}

MetricPane.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  description: PropTypes.string,
  borderTop: PropTypes.bool,
  dashedBorder: PropTypes.bool,
  highlightValue: PropTypes.bool,
};

MetricPane.defaultProps = {
  borderTop: false,
  dashedBorder: false,
  highlightValue: false,
};