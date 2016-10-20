import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';
import {
  extraWideOuterWrapperStyle, desktopOuterWrapperStyle, tabletOuterWrapperStyle
} from './responsive-fixed-width-component.style';


export default class ResponsiveFixedWidthComponent extends Component {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        outerWrapper: extraWideOuterWrapperStyle
      },
      [DESKTOP]: {
        outerWrapper: desktopOuterWrapperStyle
      },
      [TABLET]: {
        outerWrapper: tabletOuterWrapperStyle
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ style.outerWrapper }>
        <div style={ this.props.style }>
          { this.props.children }
        </div>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

ResponsiveFixedWidthComponent.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};
