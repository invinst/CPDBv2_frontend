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

    if (!data)
      return <g className='test--radar--wrapper'/>;

    let transitionData = _.cloneDeep(data);
    if (data.length === 1) {
      transitionData.push({
        items: data[0].items.map((d) => ({ r: 0 }))
      });
      transitionData = transitionData.reverse();
    }

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(d => d.r)
      .angle(d => d.angle);

    const calculatePath = (value) => {
      const index = Math.min(parseInt(value) + 1, transitionData.length - 1);
      const previousData = transitionData[index - 1].items;

      const moveData = _.map(transitionData[index].items, (d, i) => {
        const newR = (d.r - previousData[i].r) * (value - (index - 1)) + previousData[i].r;
        return {
          ...d,
          r: newR,
          x: newR * Math.cos(d.angle + Math.PI * 3 / 2),
          y: newR * Math.sin(d.angle + Math.PI * 3 / 2),
        };
      });
      return { pathD: radarLine(moveData), newItems: moveData };
    };
    const valueSpring = transitionData.length - 1;

    return (
      <g className='test--radar--wrapper'>
        <Motion defaultStyle={ { value: 0 } } style={ { value: spring(valueSpring, { stiffness: 20 }) } }>
          { ({ value }) => {
            const { pathD, newItems } = calculatePath(value);
            return (
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

                { _.map(newItems, (point, i) =>
                  <circle
                    className='test--radar--circles' r='4' key={ i }
                    cx={ point.x }
                    cy={ point.y }
                    style={ radarMainCircleStyle }/>
                )}
              </g>
            );
          }}
        </Motion>
      </g>
    );
  }
}

RadarWrapper.defaultProps = {
  extraStyle: {},
  drawStroke: true
};

RadarWrapper.propTypes = {
  data: PropTypes.array,
  extraStyle: PropTypes.object,
  drawStroke: PropTypes.bool
};
