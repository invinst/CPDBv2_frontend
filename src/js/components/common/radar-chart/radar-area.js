import React, { Component, PropTypes } from 'react';
import { radarMainAreaStyle, radarMainStrokeStyle } from './radar-area.style';
import { curveLinearClosed, radialLine } from 'd3-shape';


export default class RadarArea extends Component {
  render() {

    const { rPoints, drawStroke, extraStyle } = this.props;
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
            style={ { ...radarMainAreaStyle, ...extraStyle } }/>

          { drawStroke && (
            <path
              className='test--radar--stroke'
              d={ pathD }
              style={ radarMainStrokeStyle }/>
          ) }
        </g>
      </g>
    );
  }
}

RadarArea.defaultProps = {
  drawStroke: true,
  extraStyle: {}
};

RadarArea.propTypes = {
  rPoints: PropTypes.array,
  drawStroke: PropTypes.bool,
  extraStyle: PropTypes.object
};
