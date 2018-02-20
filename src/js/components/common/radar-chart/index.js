import React, { PropTypes } from 'react';

import { scaleLinear } from 'd3-scale';
import _ from 'lodash';

import RadarAxis from './radar-axis';
import RadarWrapper from './radar-wrapper';
import RadarTooltipPoints from './radar-tooltip-point';
import { radarContaninerStyle } from './radar-chart.style';

export default class OfficerRadarChart extends React.Component {
  constructor(props) {
    super(props);
    this.conf = {
      width: 496,
      height: 400,
      maxValue: 100,
      radius: 164
    };
  }

  _embedComputedPosition(data) {
    const rScale = scaleLinear()
      .range([0, this.conf.radius])
      .domain([0, this.conf.maxValue]);

    const angleSlice = Math.PI * 2 / data[0].items.length;

    return _.map(data, (d) => ({
      year: d.year,
      items: _.map(d.items, (d, i) => {
        const r = rScale(d.value);
        return {
          ...d,
          r: r,
          angle: i * angleSlice - Math.PI,
          x: r * Math.cos(angleSlice * i + Math.PI / 2),
          y: r * Math.sin(angleSlice * i + Math.PI / 2)
        };
      })
    }));
  }

  render() {
    const { data } = this.props;
    if (!data || data.length === 0)
      return <svg className='test--radar'/>;

    const transformData = this._embedComputedPosition(data);

    return (
      <svg
        className='test--radar' style={ radarContaninerStyle }
        width={ this.conf.width } height={ this.conf.height }
      >
        <g transform={ `translate(${this.conf.width / 2},${this.conf.height / 2})` }>
          <RadarAxis
            axisTitles={ _.map(data[0].items, (d) => d.axis) }
            radius={ this.conf.radius }
            maxValue={ this.conf.maxValue }
          />
          <RadarWrapper data={ transformData }/>
          <RadarTooltipPoints data={ transformData[transformData.length - 1].items }/>
        </g>
      </svg>
    );
  }
}

OfficerRadarChart.propTypes = {
  data: PropTypes.array
};
