import React, { Component, PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { map } from 'lodash';

import { radarContaninerStyle } from './static-radar-chart.style';
import RadarAxis from './radar-axis';
import RadarArea from './radar-area';
import RadarLegend from './radar-legend';
import RadarTooltipPoints from './radar-tooltip-point';


export default class StaticRadarChart extends Component {
  constructor(props) {
    super(props);
    this.maxValue = 100;
    this.strokeWidth = 0.5;
  }

  _embedComputedPosition(data) {
    const rScale = scaleLinear()
      .range([0, this.props.radius])
      .domain([0, this.maxValue]);

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
      textColor,
      width,
      height,
      radius,
    } = this.props;

    if (!data || !data.length)
      return <svg
        className='test--radar' width={ width }
        height={ height } style={ { backgroundColor } }/>;

    const titles = map(data, (d) => d.axis);

    const transformData = this._embedComputedPosition(data);

    return (
      <svg
        onClick={ this.props.onClick }
        className='test--radar'
        style={ { ...radarContaninerStyle, backgroundColor } }
        width='100%'
        height='100%'
        viewBox={ `0 0 ${width} ${height}` }
      >
        <g style={ { transform: 'translate(50%,40%)' } }>
          <RadarAxis
            axisTitles={ titles }
            radius={ radius }
            maxValue={ this.maxValue }
            hideText={ hideAxisText }
            textColor={ textColor }
            strokeWidth={ this.strokeWidth }
          />
          <RadarArea rPoints={ transformData } strokeWidth={ this.strokeWidth }/>
          <RadarLegend fadeOut={ fadeOutLegend } content={ legendText }/>
          { !hideAxisText && <RadarTooltipPoints data={ transformData }/> }
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
  width: 512,
  height: 392,
  radius: 164
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
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
  radius: PropTypes.number
};

