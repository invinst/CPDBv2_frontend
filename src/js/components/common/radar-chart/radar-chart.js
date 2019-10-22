import React, { Component, PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { map, range } from 'lodash';

import { radarContaninerStyle, radarBoundaryAreaStyle } from './radar-chart.style';
import RadarAxis from './radar-axis';
import RadarArea from './radar-area';
import RadarSpineLine from './radar-spine-line';
import RadarLegend from './radar-legend';
import RadarGrid from './radar-grid';
import { curveLinearClosed, radialLine } from 'd3-shape';
import { linenColor } from 'utils/styles';


export default class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.maxValue = 100;
  }

  getNumMetrics() {
    const { data, numMetrics } = this.props;
    return data && data.length ? data.length : numMetrics;
  }

  rScale(value) {
    const { radius, strokeWidth } = this.props;
    return scaleLinear().range([0, radius - strokeWidth]).domain([0, this.maxValue])(value);
  }

  angle(i) {
    const angleSlice = Math.PI * 2 / this.getNumMetrics();
    return i * angleSlice - Math.PI;
  }

  embedComputedPosition() {
    const { data } = this.props;
    const angleSlice = Math.PI * 2 / this.getNumMetrics();

    return map(data, (d, i) => {
      const r = this.rScale(d.value);
      return {
        ...d,
        r: r,
        angle: this.angle(i),
        x: r * Math.cos(angleSlice * i + Math.PI / 2),
        y: r * Math.sin(angleSlice * i + Math.PI / 2),
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
      showValueWithSuffix,
      axisTitleFontSize,
      axisTitleFontWeight,
      showGrid,
      gridColor,
      gridOpacity,
      showSpineLine,
      showSpineLinePoint,
      boundaryAreaColor,
      strokeWidth,
      radarMainAreaOpacity,
      outerGridOnly,
      offsetTop,
    } = this.props;

    const transformData = this.embedComputedPosition();

    const boundaryLine = radialLine()
      .curve(curveLinearClosed)
      .radius(this.rScale(this.maxValue))
      .angle(i => this.angle(i));
    const boundaryPathD = boundaryLine(range(this.getNumMetrics()));

    return (
      <svg
        className='test--radar'
        style={ { ...radarContaninerStyle, backgroundColor } }
        width='100%'
        height='100%'
        viewBox={ `0 0 ${width} ${height}` }
      >
        <g
          transform={ `translate(${Math.floor(width / 2)} ${Math.floor(height * 0.34) + offsetTop})` }
          className='test--radar-chart-transform'
        >
          {
            (data && (showAxisTitle || showAxisValue)) && (
              <RadarAxis
                radius={ radius }
                data={ data }
                textColor={ textColor }
                showAxisTitle={ showAxisTitle }
                showAxisValue={ showAxisValue }
                showValueWithSuffix={ showValueWithSuffix }
                axisTitleFontSize={ axisTitleFontSize }
                axisTitleFontWeight={ axisTitleFontWeight }
              />
            )
          }
          <path
            className='test--radar-boundary-area'
            d={ boundaryPathD }
            style={ radarBoundaryAreaStyle(boundaryAreaColor) }
          />
          <RadarArea
            rPoints={ transformData }
            strokeWidth={ strokeWidth }
            radarMainAreaOpacity={ radarMainAreaOpacity }
          />
          { showGrid && (
            <RadarGrid
              outerGridOnly={ outerGridOnly }
              opacity={ gridOpacity }
              numAxis={ this.getNumMetrics() }
              radius={ radius }
              maxValue={ this.maxValue }
              strokeColor={ gridColor || backgroundColor }
              strokeWidth={ strokeWidth }/>
          ) }
          { showSpineLine && <RadarSpineLine rPoints={ transformData } showSpineLinePoint={ showSpineLinePoint }/> }
          <RadarLegend fadeOut={ fadeOutLegend } content={ legendText }/>
        </g>
      </svg>
    );
  }
}


RadarChart.defaultProps = {
  width: 512,
  height: 392,
  radius: 146,
  legendText: '',
  backgroundColor: linenColor,
  showAxisTitle: false,
  showAxisValue: false,
  showArea: false,
  axisTitleFontSize: 14,
  showGrid: false,
  outerGridOnly: false,
  gridOpacity: 1,
  showSpineLine: true,
  showSpineLinePoint: false,
  fadeOutLegend: false,
  axisTitleFontWeight: 400,
  numMetrics: 3,
  strokeWidth: 0.5,
  offsetTop: 0,
};

RadarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  showAxisTitle: PropTypes.bool,
  showAxisValue: PropTypes.bool,
  showValueWithSuffix: PropTypes.bool,
  showArea: PropTypes.bool,
  axisTitleFontSize: PropTypes.number,
  axisTitleFontWeight: PropTypes.number,
  showGrid: PropTypes.bool,
  gridOpacity: PropTypes.number,
  gridColor: PropTypes.string,
  outerGridOnly: PropTypes.bool,
  showSpineLine: PropTypes.bool,
  showSpineLinePoint: PropTypes.bool,
  legendText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  strokeWidth: PropTypes.number,
  fadeOutLegend: PropTypes.bool,
  boundaryAreaColor: PropTypes.string,
  numMetrics: PropTypes.number,
  radarMainAreaOpacity: PropTypes.number,
  offsetTop: PropTypes.number,
};

