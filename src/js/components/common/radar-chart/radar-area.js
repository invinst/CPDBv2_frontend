import React, { Component, PropTypes } from 'react';
import { every } from 'lodash';

import { curveLinearClosed, radialLine } from 'd3-shape';

import roundPercentile from 'utils/round-percentile';
import { radarMainAreaStyle, radarMainStrokeStyle, valueTextStyle } from './radar-area.style';


export default class RadarArea extends Component {
  render() {

    const { rPoints, drawStroke, strokeWidth, showValueText } = this.props;
    if (!rPoints || !every(rPoints, (point) => !isNaN(point.r)))
      return <g className='test--radar-wrapper'/>;

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(d => d.r - strokeWidth)
      .angle(d => d.angle);

    // required the rPoints as follows [{'angle': 0.15, 'r': 2}]
    const pathD = radarLine(rPoints);
    const num = rPoints.length;

    return (
      <g className='test--radar-wrapper'>
        <g>
          <path
            className='test--radar-radar-area'
            d={ pathD }
            style={ radarMainAreaStyle }/>

          { drawStroke && (
            <path
              className='test--radar-stroke'
              d={ pathD }
              style={ { ...radarMainStrokeStyle, strokeWidth } }/>
          ) }
          { showValueText && rPoints.map((point, i) => (
            <text
              key={ `value-text-${i}` }
              className='test--radar-value-text'
              textAnchor='middle'
              x={ point.x } y={ point.y }
              dx={ i > num / 2 ? 8 : -8 }
              dy={ i === 0 ? 8 : 10 }
              style={ valueTextStyle }
            >
              { roundPercentile(point.value) }
            </text>
          )) }
        </g>
      </g>
    );
  }
}

RadarArea.defaultProps = {
  showValueText: false,
  drawStroke: true
};

RadarArea.propTypes = {
  showValueText: PropTypes.bool,
  rPoints: PropTypes.array,
  drawStroke: PropTypes.bool,
  strokeWidth: PropTypes.number
};
