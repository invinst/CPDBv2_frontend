import React from 'react';
import RadarAxis from './radar-axis';
import RadarWrapper from './radar-wrapper';
import RadarPoints from './radar-point';

export default class OfficerRadarChart extends React.Component {
  render() {
    const conf = {
      width: 450,
      height: 450,
      levels: 5
    };
    return (
      <svg width={ conf.width } height={ conf.height }>

        <g transform={ `translate(${conf.width / 2},${conf.height / 2})` }>
          <RadarAxis conf={ conf }/>
          <RadarWrapper/>
          <RadarPoints/>

          <text className='tooltip' x='-83.25131225585938' y='32.29166793823242' textAnchor='middle' dy='0.35em'
                style={ { fontSize: '12px', display: 'none' } }/>
        </g>
      </svg>
    );
  }
}
