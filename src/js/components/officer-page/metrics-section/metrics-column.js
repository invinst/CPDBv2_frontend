import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import { wrapperStyle } from './metrics-column.style';
import MetricPane from 'components/officer-page/metrics-section/metric-pane';


export default class MetricsColumn extends Component {

  render() {
    const { metrics, dashedSeparator, pathName } = this.props;
    const [firstMetric, ...theRest] = metrics;
    return (
      <div style={ wrapperStyle }>
        <MetricPane
          value={ firstMetric.value }
          name={ firstMetric.name }
          description={ firstMetric.description }
          highlightValue={ get(firstMetric, 'highlightValue', false) }
          borderTop={ false }
          popup={ firstMetric.popup }
          pathName={ pathName }
        />
        {
          theRest.map((metric, index) => (
            <MetricPane
              key={ index }
              value={ metric.value }
              name={ metric.name }
              description={ metric.description }
              borderTop={ true }
              highlightValue={ get(metric, 'highlightValue', false) }
              dashedBorder={ dashedSeparator }
              popup={ metric.popup }
              pathName={ pathName }
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
  pathName: PropTypes.string,
};

MetricsColumn.defaultProps = {
  dashedSeparator: false,
};
