import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import _ from 'lodash';

import {
  radarMainCircleStyle,
  radarMainAreaStyle,
  radarMainStrokeStyle
} from './radar-wrapper.style';
import { curveLinearClosed, radialLine } from 'd3-shape';


export default class RadarWrapper extends React.Component {
  render() {
    const { extraStyle, drawStroke, data } = this.props;

    const circles = _.map(data[data.length - 1].items, (point, i) =>
      <circle
        className='radarCircle' r='4' key={ i }
        cx={ point.x }
        cy={ point.y }
        style={ radarMainCircleStyle }/>
    );

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(d => d.r)
      .angle(d => d.angle);

    const calculatePath = (value) => {
      const index = Math.min(parseInt(value) + 1, data.length-1);
      const previousData = data[index - 1].items;
      const moveData = _.map(data[index].items, (d, i) => {
        return {
          ...d,
          r: (d.r - previousData[i].r) * (value - index) + d.r
        };
      });
      return radarLine(moveData);
    };
    const valueSpring = data.length - 1;

    return (
      <g className='radarWrapper'>
        <Motion defaultStyle={ { value: 0 } } style={ { value: spring(valueSpring, { stiffness: 20 }) } }>
          { ({ value }) => (
            <g>
              <path
                className='radarArea'
                d={ calculatePath(value) }
                style={ { ...radarMainAreaStyle, ...extraStyle } }/>

              { drawStroke && (
                <path
                  className='radarStroke'
                  d={ calculatePath(value) }
                  style={ radarMainStrokeStyle }/>
              ) }
            </g>
          ) }
        </Motion>
        { circles }
      </g>
    );
  }
}

RadarWrapper.defaultProps = {
  extraStyle: {},
  drawStroke: false
};

RadarWrapper.propTypes = {
  previousData: PropTypes.array,
  data: PropTypes.array,
  extraStyle: PropTypes.object,
  drawStroke: PropTypes.bool
};
