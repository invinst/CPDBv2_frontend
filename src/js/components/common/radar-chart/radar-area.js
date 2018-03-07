import React, { Component, PropTypes } from 'react';
import { radarMainAreaStyle, radarMainStrokeStyle } from './radar-area.style';
import { curveLinearClosed, radialLine } from 'd3-shape';


export default class RadarArea extends Component {
  render() {

    const { rPoints, drawStroke, strokeWidth } = this.props;
    if (!rPoints)
      return <g className='test--radar--wrapper'/>;

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(d => d.r)
      .angle(d => d.angle);

    // required the rPoints as follows [{'angle': 0.15, 'r': 2}]
    const pathD = radarLine(rPoints);

    return (
      <g className='test--radar--wrapper'>
        <g>
          <path
            className='test--radar--radar-area'
            d={ pathD }
            style={ radarMainAreaStyle }/>

          { drawStroke && (
            <path
              className='test--radar--stroke'
              d={ pathD }
              style={ { ...radarMainStrokeStyle, strokeWidth } }/>
          ) }
        </g>
      </g>
    );
  }
}

RadarArea.defaultProps = {
  drawStroke: true,
};

RadarArea.propTypes = {
  rPoints: PropTypes.array,
  drawStroke: PropTypes.bool,
  strokeWidth: PropTypes.number
};
