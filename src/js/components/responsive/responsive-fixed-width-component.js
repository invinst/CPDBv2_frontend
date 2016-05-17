import React, { PropTypes } from 'react';

import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import {
  extraWideInnerWrapperStyle, desktopInnerWrapperStyle, tabletInnerWrapperStyle
} from './responsive-fixed-width-component.style';


export default class ResponsiveFixedWidthComponent extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        innerWrapper: extraWideInnerWrapperStyle
      },
      [DESKTOP]: {
        innerWrapper: desktopInnerWrapperStyle
      },
      [TABLET]: {
        innerWrapper: tabletInnerWrapperStyle
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div>
        <div style={ style.innerWrapper }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

ResponsiveFixedWidthComponent.propTypes = {
  children: PropTypes.node
};
