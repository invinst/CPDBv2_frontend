import React, { Component, PropTypes } from 'react';
import { chunk, map } from 'lodash';

import MetricWidgetItem from './metric-widget-item';
import { wrapperStyle, chunkStyle, clearfixStyle, nestedWrapperStyle } from './metric-widget.style';


export default class MetricWidget extends Component {
  render() {
    const metricChunks = chunk(this.props.metrics, 2);
    return (
      <div style={ wrapperStyle }>
        <div style={ nestedWrapperStyle }>
          {
            map(metricChunks, (metricChunk, chunkIndex) => (
              <div
                className='test--metric-widget-chunk'
                style={ chunkStyle(chunkIndex === metricChunks.length - 1) }
                key={ chunkIndex }
              >
                { map(metricChunk, (metric, metricIndex) => (
                  <MetricWidgetItem
                    key={ metricIndex }
                    { ...metric }
                    isFirstItem={ metricIndex === 0 }
                  />
                )) }
                <div style={ clearfixStyle }/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

MetricWidget.propTypes = {
  metrics: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string,
    isHighlight: PropTypes.bool,
  })).isRequired,
};
