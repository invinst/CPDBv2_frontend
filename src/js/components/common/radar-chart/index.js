import React, { Component, PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { map } from 'lodash';

import { radarContaninerStyle } from './static-radar-chart.style';
import RadarAxis from './radar-axis';
import RadarArea from './radar-area';
import RadarSpineLine from './radar-spine-line';
import RadarLegend from './radar-legend';
import RadarTooltipPoints from './radar-tooltip-point';
import RadarGrid from './radar-grid';


export default class StaticRadarChart extends Component {
  constructor(props) {
    super(props);
    this.maxValue = 100;
    this.strokeWidth = 0.5;
  }

  _embedComputedPosition(data) {
    const rScale = scaleLinear()
      .range([0, this.props.radius - this.strokeWidth])
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
      showGrid,
      showSpineLine,
      showValueInsteadOfTitle,
      showDataPoints,
      axisTitleFontSize,
    } = this.props;

    if (!data || !data.length || isNaN(data[0].value))
      return <svg
        className='test--radar' width='100%'
        height='100%' style={ { backgroundColor } }/>;

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
        <g style={ { transform: `translate(${parseInt(width / 2)}px, ${parseInt(height * 0.4)}px)` } }>
          <RadarAxis
            data={ data }
            radius={ radius }
            maxValue={ this.maxValue }
            hideText={ hideAxisText }
            showValueInsteadOfTitle={ showValueInsteadOfTitle }
            textColor={ textColor }
            strokeWidth={ this.strokeWidth }
            axisTitleFontSize={ axisTitleFontSize }
          />
          <RadarArea showDataPoints={ showDataPoints } rPoints={ transformData } strokeWidth={ this.strokeWidth }/>

          { showSpineLine && <RadarSpineLine rPoints={ transformData }/> }
          { showGrid && (
            <RadarGrid
              numAxis={ data.length } radius={ radius } maxValue={ this.maxValue }
              strokeWidth={ this.strokeWidth }/>
          ) }
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
  showValueText: false,
  showGrid: false,
  width: 512,
  height: 392,
  radius: 164,
  showSpineLine: true,
  showDataPoints: false,
  axisTitleFontSize: 14,
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
  radius: PropTypes.number,
  showGrid: PropTypes.bool,
  showValueInsteadOfTitle: PropTypes.bool,
  showSpineLine: PropTypes.bool,
  showDataPoints: PropTypes.bool,
  axisTitleFontSize: PropTypes.number
};

