import React, { PropTypes } from 'react';
import {
  descriptionStyle,
  nameStyle,
  valueStyle,
  wrapperStyle,
} from './metric-widget-item.style';


export default function MetricWidgetItem(props) {
  const { value, name, description, isHighlight, isFirstItem } = props;
  const active = value > 0;

  return (
    <div style={ wrapperStyle(isFirstItem) }>
      <div className='test--metric-widget-item-value' style={ valueStyle(active, isHighlight) }>
        { value }
      </div>
      <div className='test--metric-widget-item-name' style={ nameStyle(active) }>
        { name }
      </div>
      <div className='test--metric-widget-item-description' style={ descriptionStyle }>
        { description }
      </div>
    </div>
  );
}

MetricWidgetItem.defaultProps = {
  isHighlight: false,
  description: '',
};

MetricWidgetItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.node,
  description: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isHighlight: PropTypes.bool,
  isFirstItem: PropTypes.bool,
};
