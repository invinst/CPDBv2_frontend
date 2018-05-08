import React, { Component, PropTypes } from 'react';
import {
  descriptionStyle,
  nameStyle,
  valueStyle,
  wrapperStyle,
} from 'components/search-page/preview-pane/widgets/metric-widget-item.style';


export default class MetricWidgetItem extends Component {
  render() {
    const { value, name, description, isHighlight, isFirstItem } = this.props;
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
}

MetricWidgetItem.defaultProps = {
  isHighlight: false,
  description: '',
};

MetricWidgetItem.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.node.isRequired,
  description: PropTypes.string,
  isHighlight: PropTypes.bool,
  isFirstItem: PropTypes.bool,
};
