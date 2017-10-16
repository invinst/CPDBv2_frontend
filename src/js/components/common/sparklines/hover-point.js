import React, { PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  hoverPointStyle,
  sustainedLineStyle,
  tooltipStyle,
  tooltipTextStyle,
  alignStyle
} from './hover-point.style';

export class HoverPoint extends React.Component {
  render() {
    const {
      alignment,
      hasSustainedCR,
      width,
      height,
      hovering,
      tooltipData,
      clickHandler
    } = this.props;

    let tooltip = null;
    const alignedStyle = alignStyle(alignment);

    if (hovering) {
      tooltip = (
        <div className='test--sparkline--tooltip' style={ { ...tooltipStyle, ...alignedStyle } }>
          <div style={ tooltipTextStyle }>{ tooltipData.count } complaints</div>
          <div style={ tooltipTextStyle }>{ tooltipData.year }</div>
        </div>
      );
    }

    return (
      <div className='test--sparkline--hover-point'
        onClick={ clickHandler } style={ hoverPointStyle(width, height, hovering) }>
        <span style={ { ...sustainedLineStyle(hasSustainedCR), ...alignedStyle } } />
        { tooltip }
      </div>

    );
  }
}

HoverPoint.propTypes = {
  year: PropTypes.number,
  hasSustainedCR: PropTypes.bool,
  width: PropTypes.number,
  hovering: PropTypes.bool,
  alignment: PropTypes.string,
  tooltipData: PropTypes.object,
  height: PropTypes.number,
  clickHandler: PropTypes.func
};

export default Hoverable(HoverPoint, 'div', 'inline-block');
