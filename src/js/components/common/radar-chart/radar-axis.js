import React, { PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { curveLinearClosed, radialLine } from 'd3-shape';

import { radarAxisTextStyle, radarAxisTitleStyle, radarBoundaryAreaStyle } from './radar-axis.style';
import { softBlackColor } from 'utils/styles';


export default class RadarAxis extends React.Component {

  showWords(title, xText, yText) {
    const words = title.split(' ');
    if (words.length >= 2) {
      return [
        <tspan key='1' style={ radarAxisTitleStyle } x={ xText } y={ yText } dy='0'>
          { words.slice(0, -1).join(' ') }
        </tspan>,
        <tspan key='2' style={ radarAxisTitleStyle } x={ xText } y={ yText } dy='1.4em'>
          { words[words.length - 1] }
        </tspan>
      ];
    }
    return (
      <tspan style={ radarAxisTitleStyle } x={ xText } y={ yText } dy='0.35em'>{ title }</tspan>
    );
  }

  render() {
    const { radius, axisTitles, maxValue, hideText, textColor } = this.props;

    if (!axisTitles)
      return <g className='test--radar-axis-wrapper'/>;
    const angleSlice = Math.PI * 2 / axisTitles.length;
    const labelFactor = 1.25; // How much farther than radius of outer circle should labels be placed

    const rScale = scaleLinear()
      .range([0, radius])
      .domain([0, maxValue]);

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(rScale(maxValue))
      .angle((d, i) => i * angleSlice - Math.PI);

    return (
      <g className='test--radar-axis-wrapper'>
        { !hideText && axisTitles.map((title, i) => {
          const xText = radius * labelFactor * Math.cos(angleSlice * i + Math.PI / 2);
          const yText = radius * labelFactor * Math.sin(angleSlice * i + Math.PI / 2);

          return (
            <text key={ `axis--${i}` } className='test--radar-axis-text'
              textAnchor='middle' dy='0.35em'
              x={ xText } y={ yText } style={ { ...radarAxisTextStyle, fill: textColor } }>

              { this.showWords(title, xText, yText) }
            </text>
          );
        }) }

        <path
          className='test--radar-boundary-area'
          d={ radarLine(axisTitles.map(() => ({ value: maxValue }))) }
          style={ radarBoundaryAreaStyle }/>
      </g>
    );
  }
}

RadarAxis.defaultProps = {
  hideText: false,
  textColor: softBlackColor
};

RadarAxis.propTypes = {
  radius: PropTypes.number,
  maxValue: PropTypes.number,
  axisTitles: PropTypes.array,
  hideText: PropTypes.bool,
  textColor: PropTypes.string
};
