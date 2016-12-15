import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { EXTRA_WIDE, TABLET, DESKTOP } from 'utils/constants';
import {
  wrapperStyle, wrapperHoverStyle, responsiveStyleWrapperStyle,
  sunburstGraphicStyle, sunburstGraphicHoverStyle
} from './sunburst-graphic.style';

export class SunburstGraphic extends Component {
  renderWithResponsiveStyle(style) {
    const { hovering } = this.props;

    return (
      <a className='link--transition'
        style={ { ...style.wrapper, ...(hovering ? wrapperHoverStyle : {}) } }
        href='https://beta.cpdb.co'>
        <div style={ { ...style.sunburst, ...(hovering ? sunburstGraphicHoverStyle : {}) } }/>
      </a>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        style={ responsiveStyleWrapperStyle }
        responsiveStyle={ {
          [TABLET]: {
            wrapper: wrapperStyle.tablet,
            sunburst: sunburstGraphicStyle.tablet
          },
          [DESKTOP]: {
            wrapper: wrapperStyle.desktop,
            sunburst: sunburstGraphicStyle.desktop
          },
          [EXTRA_WIDE]: {
            wrapper: wrapperStyle.extraWide,
            sunburst: sunburstGraphicStyle.extraWide
          }
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

SunburstGraphic.propTypes = {
  hovering: PropTypes.bool
};

export default Hoverable(SunburstGraphic);
