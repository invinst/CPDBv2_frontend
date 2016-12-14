import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { EXTRA_WIDE, TABLET, DESKTOP } from 'utils/constants';
import HoverableLink from 'components/common/hoverable-link';
import {
  loadMoreResponsiveStyle, loadMoreHoverStyle
} from './more-link.style';

class MoreLink extends Component {
  renderWithResponsiveStyle(style) {
    const { to, children } = this.props;
    return (
      <HoverableLink
        to={ to }
        style={ {
          base: style.base,
          hover: { ...style.base, ...loadMoreHoverStyle }
        } }>
        { children }
      </HoverableLink>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [TABLET]: {
            base: loadMoreResponsiveStyle.tablet
          },
          [DESKTOP]: {
            base: loadMoreResponsiveStyle.desktop
          },
          [EXTRA_WIDE]: {
            base: loadMoreResponsiveStyle.extraWide
          }
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}
MoreLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node
};

export default MoreLink;
