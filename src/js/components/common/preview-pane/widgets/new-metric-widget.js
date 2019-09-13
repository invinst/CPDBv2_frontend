import React, { Component, PropTypes } from 'react';
import { chunk, map } from 'lodash';
import cx from 'classnames';

import MetricWidgetItem from './new-metric-widget-item';
import styles from './new-metric-widget.sass';


export default class MetricWidget extends Component {
  render() {
    const metricChunks = chunk(this.props.metrics, 2);
    return (
      <div className={ styles.wrapper }>
        <div className={ styles.nestedWrapper }>
          {
            map(metricChunks, (metricChunk, chunkIndex) => (
              <div
                className={ cx(
                  'test--metric-widget-chunk',
                  styles.chunk,
                  { 'is-last-item': chunkIndex === metricChunks.length - 1 }
                ) }
                key={ chunkIndex }
              >
                { map(metricChunk, (metric, metricIndex) => (
                  <MetricWidgetItem
                    key={ metricIndex }
                    { ...metric }
                    isFirstItem={ metricIndex === 0 }
                  />
                )) }
                <div className='clear-fix' />
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
    name: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isHighlight: PropTypes.bool,
  })).isRequired,
};
