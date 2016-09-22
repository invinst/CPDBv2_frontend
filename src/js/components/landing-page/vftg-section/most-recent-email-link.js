import React, { PropTypes } from 'react';

import MoreLink from 'components/common/more-link';
import Hoverable from 'components/common/higher-order/hoverable';
import { wrapperStyle, iconStyle, linkStyle, iconHoverStyle, linkHoverStyle } from './most-recent-email-link.style';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';


class MostRecentEmailLink extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        link: [linkStyle.base, linkStyle.extraWide]
      },
      [DESKTOP]: {
        link: [linkStyle.base, linkStyle.desktop]
      },
      [TABLET]: {
        link: [linkStyle.base, linkStyle.tablet]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { hovering, href } = this.props;
    return (
      <div style={ wrapperStyle }>
        <i className='link--transition' style={ hovering ? iconHoverStyle : iconStyle }/>
        <MoreLink style={ [style.link, hovering ? linkHoverStyle : {}] } showAccentColor={ hovering } href={ href }>
          Most Recent Email
        </MoreLink>
      </div>
    );
  }
}

MostRecentEmailLink.propTypes = {
  hovering: PropTypes.bool,
  href: PropTypes.string
};

export default Hoverable(MostRecentEmailLink);
