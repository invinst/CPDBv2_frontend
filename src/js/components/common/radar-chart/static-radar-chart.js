import React, { Component, PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { map } from 'lodash';

import { radarContaninerStyle } from './static-radar-chart.style';
import RadarAxis from './radar-axis';
import RadarArea from './radar-area';
import RadarLegend from './radar-legend';
import RadarTooltipPoints from './radar-tooltip-point';


export class StaticRadarChart extends Component {
  constructor(props) {
    super(props);
    this.config = {
      width: 496,
      height: 400,
      maxValue: 100,
      radius: 164
    };
  }

  _embedComputedPosition(data) {
    const rScale = scaleLinear()
      .range([0, this.config.radius])
      .domain([0, this.config.maxValue]);

    const angleSlice = Math.PI * 2 / data.length;

    return map(data, (d, i) => {
      const r = rScale(d.value);
      return {
        ...d,
        r: r,
        angle: i * angleSlice - Math.PI,
        x: r * Math.cos(angleSlice * i + Math.PI / 2),
        y: r * Math.sin(angleSlice * i + Math.PI / 2)
      };
    });
  }

  render() {
    const {
      data,
      legendText,
      fadeOutLegend,
      hideAxisText,
      backgroundColor,
      textColor
    } = this.props;

    if (!data.length)
      return <svg className='test--radar'/>;

    const titles = map(data, (d) => d.axis);

    const transformData = this._embedComputedPosition(data);

    return (
      <svg
        onClick={ this.props.onClick }
        className='test--radar'
        style={ { ...radarContaninerStyle, backgroundColor } }
        width={ this.config.width }
        height={ this.config.height }
      >
        <g transform={ `translate(${this.config.width / 2},${this.config.height / 2.5})` }>
          <RadarAxis
            axisTitles={ titles }
            radius={ this.config.radius }
            maxValue={ this.config.maxValue }
            hideText={ hideAxisText }
            textColor={ textColor }
          />
          <RadarArea rPoints={ transformData }/>
          <RadarLegend fadeOut={ fadeOutLegend } content={ legendText }/>
          <RadarTooltipPoints data={ transformData }/>}
        </g>
      </svg>
    );
  }
}

StaticRadarChart.defaultProps = {
  backgroundColor: '#fdfaf2',
  legendText: '',
  fadeOutLegend: false,
  hideAxisText: false,
};

StaticRadarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  legendText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
  fadeOutLegend: PropTypes.bool,
  hideAxisText: PropTypes.bool,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func
};

