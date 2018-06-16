import React, { PropTypes } from 'react';

import { axisSpineLineStyle } from './radar-spine-line.style';


export default class RadarSpineLine extends React.Component {
  render() {
    const { rPoints } = this.props;

    return (
      <g className='test--radar-spine-line'>
        { rPoints.map((point, i) => (point.x) && (
          <line
            key={ `line-${i}` }
            x1={ 0 } y1={ 0 }
            x2={ point.x }
            y2={ point.y }
            style={ axisSpineLineStyle }
          />
        )) }
      </g>
    );
  }
}

RadarSpineLine.propTypes = {
  rPoints: PropTypes.array.isRequired,
};
