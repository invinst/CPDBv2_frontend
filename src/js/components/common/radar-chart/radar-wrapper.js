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

    const circles = data ? data.map((point, i) => {
      return <circle
        className='radarCircle' r='4' key={ i }
        cx={ point.x }
        cy={ point.y }
        style={ radarMainCircleStyle }/>;
    }) : null;

    let previousData = this.props.previousData || _.map(data, (d) => ({ ...d, r: 0 }));

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(d => d.r)
      .angle(d => d.angle);

    const calculatePath = (value) => {
      const moveData = _.map(data, (d, i) => ({
        ...d,
        r: (d.r - previousData[i].r) * value + previousData[i].r
      }));
      return radarLine(moveData);
    };


    return (
      <g className='radarWrapper'>
        <Motion defaultStyle={ { value: 0 } } style={ { value: spring(1, { stiffness: 100 }) } }>
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
