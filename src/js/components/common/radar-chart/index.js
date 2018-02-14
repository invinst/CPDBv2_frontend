import React from 'react';

import { scaleLinear } from 'd3-scale';
import _ from 'lodash';

import RadarAxis from './radar-axis';
import RadarWrapper from './radar-wrapper';
import RadarTooltipPoints from './radar-tooltip-point';
import { radarContaninerStyle } from './radar-chart.style';

export default class OfficerRadarChart extends React.Component {
  render() {
    const conf = {
      width: 496,
      height: 400
    };

    const data = [
      { axis: 'Use of Force Reports', value: 90 },
      { axis: 'Civilian Complaints', value: 50 },
      { axis: 'Internal Complaints', value: 60 },
    ]; // TODO: dummy data, retrieve from this.props, remove later

    const maxValue = 100;
    const radius = 164;

    const rScale = scaleLinear()
      .range([0, radius])
      .domain([0, maxValue]);

    const angleSlice = Math.PI * 2 / data.length;
    const transformData = _.map(data, (d, i) => {
      const r = rScale(d.value);
      return {
        ...d,
        r: r,
        angle: i * angleSlice - Math.PI,
        x: r * Math.cos(angleSlice * i + Math.PI / 2),
        y: r * Math.sin(angleSlice * i + Math.PI / 2)
      };
    });

    return (
      <svg width={ conf.width } height={ conf.height } style={ radarContaninerStyle }>
        <g transform={ `translate(${conf.width / 2},${conf.height / 2})` }>
          <RadarAxis
            axisTitles={ _.map(data, (d) => d.axis) }
            radius={ radius }
            maxValue={ maxValue }
          />
          <RadarWrapper
            data={ transformData }/>
          <RadarTooltipPoints data={ transformData }/>
        </g>
      </svg>
    );
  }
}
