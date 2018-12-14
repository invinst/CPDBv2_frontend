import React, { PropTypes } from 'react';

import { spring, Motion } from 'react-motion';
import { radarLegendTextStyle } from './radar-legend.style';


export default class RadarLegend extends React.Component {
  render() {
    const { fadeOut, content } = this.props;

    const legendYearText = (content, opacity) => content ? (
      <text
        className='test--radar-legend-content no-print' textAnchor='middle' dy='0.35em'
        style={ { ...radarLegendTextStyle, opacity, visibility: opacity ? 'visible' : 'hidden' } }
        x={ 180 }
        y={ 180 }>
        { content }
      </text>
    ) : null;

    return fadeOut ?
      (
        <Motion defaultStyle={ { opacity: 1 } } style={ { opacity: spring(0, { stiffness: 100 }) } }>
          { interpolatingStyle => legendYearText(content, interpolatingStyle.opacity) }
        </Motion>
      ) : legendYearText(content, 1);
  }
}

RadarLegend.propTypes = {
  fadeOut: PropTypes.bool,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
};

RadarLegend.defaultProps = {
  fadeOut: false
};
