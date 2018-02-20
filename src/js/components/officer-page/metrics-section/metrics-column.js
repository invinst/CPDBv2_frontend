import React, { Component, PropTypes } from 'react';
import { slice } from 'lodash';

import { wrapperStyle } from './metrics-column.style';
import MetricPane from 'components/officer-page/metrics-section/metric-pane';


export default class MetricsColumn extends Component {

  render() {
    const { metrics, dashedSeparator } = this.props;
    const firstMetric = metrics[0];
    const theRest = slice(metrics, 1, metrics.length);
    return (
      <div style={ wrapperStyle }>
        <MetricPane
          value={ firstMetric.value }
          name={ firstMetric.name }
          description={ firstMetric.description }
          borderTop={ false }
        />
        {
          theRest.map((metric, index) => (
            <MetricPane
              key={ index }
              value={ metric.value }
              name={ metric.name }
              description={ metric.description }
              borderTop={ true }
              dashedBorder={ dashedSeparator }
            />
          ))
        }
      </div>
    );
  }
}

MetricsColumn.propTypes = {
  metrics: PropTypes.array,
  dashedSeparator: PropTypes.bool,
};

MetricsColumn.defaultProps = {
  dashedSeparator: false,
};
