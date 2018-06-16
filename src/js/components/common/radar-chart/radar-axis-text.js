import React, { PropTypes } from 'react';
import { radarAxisTextStyle, radarAxisTitleStyle } from './radar-axis-text.style';


export default class RadarAxisText extends React.Component {
  showWords(title, xText, yText, extraPadding, fontSize) {
    const words = title.split(' ');

    if (words.length >= 2) {
      return [
        <tspan
          key='1'
          style={ { ...radarAxisTitleStyle, fontSize: `${fontSize}px` } }
          x={ xText } y={ yText } dy={ `${extraPadding}em` }
        >
          { words.slice(0, -1).join(' ') }
        </tspan>,
        <tspan
          key='2'
          style={ { ...radarAxisTitleStyle, fontSize: `${fontSize}px` } }
          x={ xText } y={ yText }
          dy={ `${1.4 + extraPadding}em` }
        >
          { words[words.length - 1] }
        </tspan>
      ];
    }
    return (
      <tspan
        style={ { ...radarAxisTitleStyle, fontSize: `${fontSize}px` } }
        x={ xText }
        y={ yText }
        dy='0.35em'
      >
        { title }
      </tspan>
    );
  }


  render() {
    const { radius, axisTitles, labelFactor, textColor, axisTitleFontSize } = this.props;
    const angleSlice = Math.PI * 2 / axisTitles.length;

    return (
      <g>
        {
          axisTitles.map((title, i) => {
            const xText = radius * labelFactor * Math.cos(angleSlice * i + Math.PI / 2);
            const yText = radius * labelFactor * Math.sin(angleSlice * i + Math.PI / 2);
            const extraPadding = i === 0 ? -1.1 : 0;

            return (
              <text
                key={ `axis--${i}` } className='test--radar-axis-text'
                textAnchor='middle' dy='0.35em'
                x={ xText } y={ yText }
                style={ { ...radarAxisTextStyle, fill: textColor } }
              >
                { this.showWords(title, xText, yText, extraPadding, axisTitleFontSize) }
              </text>
            );
          })
        }
      </g>
    );
  }
}

RadarAxisText.propTypes = {
  axisTitles: PropTypes.arrayOf(PropTypes.string),
  labelFactor: PropTypes.number,
  textColor: PropTypes.string,
  radius: PropTypes.number,
  axisTitleFontSize: PropTypes.number,
};
