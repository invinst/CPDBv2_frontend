import React, { PropTypes } from 'react';
import { every } from 'lodash';

import { curveLinearClosed, radialLine } from 'd3-shape';

import { radarMainAreaStyle, radarMainStrokeStyle } from './radar-area.style';


export default function RadarArea(props) {
  const { rPoints, strokeWidth, radarMainAreaOpacity } = props;
  if (!rPoints || !every(rPoints, (point) => !isNaN(point.r)))
    return <g className='test--radar-wrapper'/>;

  const radarLine = radialLine()
    .curve(curveLinearClosed)
    .radius(d => d.r - strokeWidth)
    .angle(d => d.angle);

  // required the rPoints as follows [{'angle': 0.15, 'r': 2}]
  const pathD = radarLine(rPoints);

  return (
    <g className='test--radar-wrapper'>
      <g>
        <path
          className='test--radar-radar-area'
          d={ pathD }
          style={ radarMainAreaStyle(radarMainAreaOpacity) }
        />
        <path
          className='test--radar-stroke'
          d={ pathD }
          style={ { ...radarMainStrokeStyle, strokeWidth } }
        />
      </g>
    </g>
  );
}

RadarArea.defaultProps = {
  radarMainAreaOpacity: 1,
};

RadarArea.propTypes = {
  rPoints: PropTypes.array,
  strokeWidth: PropTypes.number,
  radarMainAreaOpacity: PropTypes.number,
};
