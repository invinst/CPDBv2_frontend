import React from 'react';

import { scaleLinear } from 'd3-scale';
import _ from 'lodash';

import { radarAxisLineStyle, radarAxisTextStyle, radarGridCircleStyle } from './radar-axis.style';

export default class RadarAxis extends React.Component {
  render() {
    const { conf } = this.props;

    const totalAxis = 3;
    const maxValue = 60; // TODO: this is props

    const levels = conf.levels;
    const angleSlice = Math.PI * 2 / totalAxis;
    const radius = 145;
    // const radius = Math.min(conf.width / 2, conf.height / 2);

    const rScale = scaleLinear()
      .range([0, radius])
      .domain([0, maxValue]);

    const labelFactor = 1.25; // How much farther than the radius of the outer circle should the labels be placed

    return (
      <g className='axisWrapper'>
        {
          _.range(levels , 0, -1).map((l) => (
            <circle
              key={ `grid-circle-${l}` }
              className='test--radar--axis--gridCircle'
              r={ radius / levels * l }
              style={ radarGridCircleStyle }/>
          ))
        }
        {
          _.range(levels ,0 , -1).map((l) => (
            <text
              key={ `label-${l}` }
              className='test--radar--axis--label'
              x='4' y={ -l * radius / conf.levels } dy='0.4em'
              fill='#737373' style={ radarAxisTextStyle }>
              { maxValue * l / conf.levels }
            </text>
          ))
        }

        { _.range(totalAxis).map((d, i) => {
          const x2Line = rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
          const y2Line = rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
          const xText = rScale(maxValue * labelFactor) * Math.cos(angleSlice * i - Math.PI / 2);
          const yText = rScale(maxValue * labelFactor) * Math.sin(angleSlice * i - Math.PI / 2);

          return (
            <g key={ `axis--${i}` } className='test--radar--axis--axis'>
              <line x1='0' y1='0' x2={ x2Line } y2={ y2Line } className='line'
                    style={ radarAxisLineStyle }/>
              <text className='legend' textAnchor='middle' dy='0.35em' x={ xText } y={ yText }
                    style={ radarAxisTextStyle }>
                <tspan x={ xText } y={ yText } dy='0.35em'>Sales</tspan>
              </text>
            </g>
          );
        })
        }
      </g>
    );
  }
}
