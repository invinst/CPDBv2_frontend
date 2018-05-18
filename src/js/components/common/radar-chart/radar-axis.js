import React, { PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { curveLinearClosed, radialLine } from 'd3-shape';

import { radarBoundaryAreaStyle } from './radar-axis.style';
import { softBlackColor } from 'utils/styles';
import RadarAxisText from './radar-axis-text';
import { roundedPercentile } from 'utils/calculations';


export default class RadarAxis extends React.Component {
  render() {
    const {
      radius, data, maxValue, hideText, textColor, strokeWidth, showValueInsteadOfTitle, axisTitleFontSize
    } = this.props;
    if (!data)
      return <g className='test--radar-axis-wrapper'/>;

    const axisTitles = data.map(
      (item) => showValueInsteadOfTitle ? roundedPercentile(item.value).toString() : item.axis
    );
    const labelFactor = showValueInsteadOfTitle ? 1.1 : 1.25;
    const angleSlice = Math.PI * 2 / axisTitles.length;

    const rScale = scaleLinear()
      .range([0, radius + strokeWidth])
      .domain([0, maxValue]);

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(rScale(maxValue))
      .angle((d, i) => i * angleSlice - Math.PI);

    return (
      <g className='test--radar-axis-wrapper'>
        {
          !hideText && (
            <RadarAxisText
              radius={ radius }
              axisTitles={ axisTitles }
              labelFactor={ labelFactor }
              textColor={ textColor }
              axisTitleFontSize={ axisTitleFontSize }
            />
          )
        }

        <path
          className='test--radar-boundary-area'
          d={ radarLine(axisTitles.map(() => ({ value: maxValue }))) }
          style={ radarBoundaryAreaStyle }
        />
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
  data: PropTypes.array,
  hideText: PropTypes.bool,
  textColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  showValueInsteadOfTitle: PropTypes.bool,
  axisTitleFontSize: PropTypes.number
};
