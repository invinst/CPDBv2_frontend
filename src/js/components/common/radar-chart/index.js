import React, { Component, PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { map } from 'lodash';

import { radarContaninerStyle } from './static-radar-chart.style';
import RadarAxis from './radar-axis';
import RadarArea from './radar-area';
import RadarSpineLine from './radar-spine-line';
import RadarLegend from './radar-legend';
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
      width,
      height,
      radius,
      backgroundColor,
      textColor,
      data,
      legendText,
      fadeOutLegend,
      showAxisTitle,
      showAxisValue,
      axisTitleFontSize,
      axisTitleFontWeight,
      showGrid,
      gridColor,
      gridOpacity,
      showSpineLine,
      showSpineLinePoint,
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
        <g style={ { transform: `translate(${parseInt(width / 2)}px, ${parseInt(height * 0.34)}px)` } }>
          <RadarAxis
            data={ data }
            radius={ radius }
            maxValue={ this.maxValue }
            showAxisTitle={ showAxisTitle }
            showAxisValue={ showAxisValue }
            textColor={ textColor }
            strokeWidth={ this.strokeWidth }
            axisTitleFontSize={ axisTitleFontSize }
            axisTitleFontWeight={ axisTitleFontWeight }
          />
          <RadarArea rPoints={ transformData } strokeWidth={ this.strokeWidth }/>

          { showGrid && (
            <RadarGrid
              opacity={ gridOpacity }
              numAxis={ data.length }
              radius={ radius }
              maxValue={ this.maxValue }
              strokeColor={ gridColor || backgroundColor }
              strokeWidth={ this.strokeWidth }/>
          ) }
          { showSpineLine && <RadarSpineLine rPoints={ transformData } showSpineLinePoint={ showSpineLinePoint }/> }
          <RadarLegend fadeOut={ fadeOutLegend } content={ legendText }/>
        </g>
      </svg>
    );
  }
}


StaticRadarChart.defaultProps = {
  width: 512,
  height: 392,
  radius: 146,
  legendText: '',
  backgroundColor: '#fdfaf2',
  showAxisTitle: false,
  showAxisValue: false,
  axisTitleFontSize: 14,
  showGrid: false,
  gridOpacity: 1,
  showSpineLine: true,
  showSpineLinePoint: false,
  fadeOutLegend: false,
  axisTitleFontWeight: 400,
};

StaticRadarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  onClick: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  showAxisTitle: PropTypes.bool,
  showAxisValue: PropTypes.bool,
  axisTitleFontSize: PropTypes.number,
  axisTitleFontWeight: PropTypes.number,
  showGrid: PropTypes.bool,
  gridOpacity: PropTypes.number,
  gridColor: PropTypes.string,
  showSpineLine: PropTypes.bool,
  showSpineLinePoint: PropTypes.bool,
  legendText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
  fadeOutLegend: PropTypes.bool,
};

