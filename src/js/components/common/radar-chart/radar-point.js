import React from 'react';
import { radarPointStyle } from './radar-point.style';


export default class RadarPoints extends React.Component {
  render() {
    return (
      <g className='radarCircleWrapper'>
        <circle
          className='radarInvisibleCircle' r='6' cx='6.2150825056728174e-15' cy='-101.5'
          style={ radarPointStyle }/>
        <circle
          className='radarInvisibleCircle' r='6' cx='41.85789451624786' cy='-24.166666666666664'
          style={ radarPointStyle }/>
        <circle
          className='radarInvisibleCircle' r='6' cx='125.57368354874362' cy='72.49999999999997'
          style={ radarPointStyle }/>
        <circle
          className='radarInvisibleCircle' r='6' cx='3.847432027321268e-15' cy='62.833333333333336'
          style={ radarPointStyle }/>
        <circle
          className='radarInvisibleCircle' r='6' cx='-73.25131540343376' cy='42.2916666666667'
          style={ radarPointStyle }/>
        <circle
          className='radarInvisibleCircle' r='6' cx='-41.85789451624788' cy='-24.166666666666636'
          style={ radarPointStyle }/>
      </g>
    );
  }
}
