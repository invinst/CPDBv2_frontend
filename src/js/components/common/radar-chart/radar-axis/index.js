import React, { PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { curveLinearClosed, radialLine } from 'd3-shape';

import { radarBoundaryAreaStyle } from './radar-axis.style';
import { softBlackColor } from 'utils/styles';
import RadarAxisText from './radar-axis-text';


export default class RadarAxis extends React.Component {
  render() {
    const {
      radius, data, maxValue, showAxisTitle, textColor, strokeWidth,
      axisTitleFontSize, axisTitleFontWeight, showAxisValue, axisValueSuffix
    } = this.props;
    if (!data)
      return <g className='test--radar-axis-wrapper'/>;

    const angleSlice = Math.PI * 2 / data.length;

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
          (showAxisTitle || showAxisValue) && (
            <RadarAxisText
              radius={ radius }
              data={ data }
              textColor={ textColor }
              showAxisTitle={ showAxisTitle }
              showAxisValue={ showAxisValue }
              axisValueSuffix={ axisValueSuffix }
              axisTitleFontSize={ axisTitleFontSize }
              axisTitleFontWeight={ axisTitleFontWeight }
            />
          )
        }

        <path
          className='test--radar-boundary-area'
          d={ radarLine(data.map(() => ({ value: maxValue }))) }
          style={ radarBoundaryAreaStyle }
        />
      </g>
    );
  }
}

RadarAxis.defaultProps = {
  showAxisTitle: false,
  showAxisValue: false,
  axisValueSuffix: '',
  textColor: softBlackColor,
};

RadarAxis.propTypes = {
  radius: PropTypes.number,
  maxValue: PropTypes.number,
  data: PropTypes.array,
  textColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  showAxisTitle: PropTypes.bool,
  showAxisValue: PropTypes.bool,
  axisValueSuffix: PropTypes.string,
  axisTitleFontSize: PropTypes.number,
  axisTitleFontWeight: PropTypes.number,
};
