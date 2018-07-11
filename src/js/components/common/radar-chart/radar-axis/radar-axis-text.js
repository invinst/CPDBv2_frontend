import React, { PropTypes } from 'react';
import { ordinalSuffix } from 'ordinal-js';
import { isEmpty, compact } from 'lodash';

import { roundedPercentile } from 'utils/calculations';
import {
  radarAxisTextStyle,
  radarAxisTitleStyle,
  radarAxisValueTitleStyle
} from './radar-axis-text.style';


const LINE_HEIGHT = 1.275;

export default class RadarAxisText extends React.Component {
  renderTitleTexts(title, value, xText, yText, extraPadding, fontSize) {
    const { showAxisTitle } = this.props;
    const words = title.split(' ');
    const titlePhases = showAxisTitle ? [words.slice(0, -1).join(' '), words[words.length - 1]] : [];
    const axisTitles = titlePhases.map((phase, idx) => (
      <tspan
        key={ `text-${title}-${idx}` }
        style={ { ...radarAxisTitleStyle, fontSize: `${fontSize}px` } }
        x={ xText }
        y={ yText }
        dy={ `${extraPadding + idx * LINE_HEIGHT}em` }
      >
        { phase }
      </tspan>
    ));

    const valueTitle = this.renderValueTitles(
      title, value, xText, yText, extraPadding + axisTitles.length * LINE_HEIGHT, fontSize
    );
    return compact([...axisTitles, valueTitle]);
  }

  renderValueTitles(title, value, xText, yText, extraPadding, fontSize) {
    const { showAxisValue, showValueWithSuffix } = this.props;
    const roundedValue = roundedPercentile(value);
    let content;

    if (showValueWithSuffix) {
      const thSuffix = (
        <tspan
          key={ `text-value-${title}-suffix` }
          style={ { fontSize: `${fontSize * 0.7}px` } }
          baselineShift='super'
        >
          { ordinalSuffix(roundedValue) }
        </tspan>
      );
      content = (roundedValue !== 0) ? [roundedValue, thSuffix, ' percentile'] : null;
    } else if (showAxisValue) {
      content = [roundedValue];
    }

    return !isEmpty(content) ? (
      <tspan
        key={ `text-value-${title}` }
        style={ { ...radarAxisValueTitleStyle, fontSize: `${fontSize}px` } }
        x={ xText }
        y={ yText }
        dy={ `${extraPadding}em` }
      >
        { content }
      </tspan>
    ) : null;
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
            const content = this.renderTitleTexts(item.axis, item.value, xText, yText, extraPadding, axisTitleFontSize);
            return !isEmpty(content) ? (
              <text
                key={ `axis--${i}` }
                className='test--radar-axis-text'
                textAnchor={ +xText.toFixed(4) === 0 ? 'middle' : xText > 0 ? 'start' : 'end' }
                dy='0.35em'
                x={ xText }
                y={ yText }
                style={ { ...radarAxisTextStyle, fill: textColor, fontWeight: axisTitleFontWeight } }
              >
                { content }
              </text>
            ) : null;
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
  showValueWithSuffix: PropTypes.bool,
};
