import React, { PropTypes } from 'react';
import { radarAxisTextStyle, radarAxisTitleStyle, radarAxisValueTitleStyle } from './radar-axis-text.style';

import { roundedPercentile } from 'utils/calculations';


export default class RadarAxisText extends React.Component {
  renderTitleTexts(title, value, xText, yText, extraPadding, fontSize) {
    const { showAxisTitle, showAxisValue } = this.props;

    const words = title.split(' ');
    const phases = showAxisTitle ? [words.slice(0, -1).join(' '), words[words.length - 1]] : [];
    const axisTitles = phases.map((phase, idx) => (
      <tspan
        key={ `text-${title}-${idx}` }
        style={ { ...radarAxisTitleStyle, fontSize: `${fontSize}px` } }
        x={ xText }
        y={ yText }
        dy={ `${extraPadding + idx * 1.25}em` }
      >
        { phase }
      </tspan>
    ));
    const valueTitle = showAxisValue ? (
      <tspan
        key={ `text-value-${title}` }
        style={ { ...radarAxisValueTitleStyle, fontSize: `${fontSize}px` } }
        x={ xText }
        y={ yText }
        dy={ `${extraPadding + phases.length * 1.3}em` }
      >
        { `${roundedPercentile(value)}%` }
      </tspan>
    ) : null;
    return [...axisTitles, valueTitle];
  }

  render() {
    const { radius, data, textColor, axisTitleFontSize, axisTitleFontWeight } = this.props;
    const angleSlice = Math.PI * 2 / data.length;
    const labelFactor = 1.1;

    return (
      <g>
        {
          data.map((item, i) => {
            const xText = radius * labelFactor * Math.cos(angleSlice * i + Math.PI / 2);
            const yText = radius * labelFactor * Math.sin(angleSlice * i + Math.PI / 2);
            const extraPadding = +xText.toFixed(4) === 0 ? 0.7 : 1.4;

            return (
              <text
                key={ `axis--${i}` }
                className='test--radar-axis-text'
                textAnchor={ +xText.toFixed(4) === 0 ? 'middle' : xText > 0 ? 'start' : 'end' }
                dy='0.35em'
                x={ xText }
                y={ yText }
                style={ { ...radarAxisTextStyle, fill: textColor, fontWeight: axisTitleFontWeight } }
              >
                { this.renderTitleTexts(item.axis, item.value, xText, yText, extraPadding, axisTitleFontSize) }
              </text>
            );
          })
        }
      </g>
    );
  }
}

RadarAxisText.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    'axis': PropTypes.string,
    'value': PropTypes.number,
  })),
  textColor: PropTypes.string,
  radius: PropTypes.number,
  axisTitleFontSize: PropTypes.number,
  axisTitleFontWeight: PropTypes.number,
  showAxisTitle: PropTypes.bool,
  showAxisValue: PropTypes.bool,
};
