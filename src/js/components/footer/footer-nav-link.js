import React, { PropTypes } from 'react';

import OutboundLink from 'components/common/outbound-link';
import Hoverable from 'components/common/higher-order/hoverable';
import { navStyle } from './footer-nav-link.style';


class FooterNavLink extends React.Component {
  render() {
    const { name, externalHref, onClick, hovering } = this.props;

    return (
      <OutboundLink
        href={ externalHref }
        style={ { ...navStyle(hovering), ...this.props.style(hovering) } }
        onClick={ onClick }
        target='_blank'
      >
        { name }
      </OutboundLink>
    );

  }
}

FooterNavLink.propTypes = {
  externalHref: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.func,
  hovering: PropTypes.bool
};

FooterNavLink.defaultProps = {
  style: () => null
};

export default Hoverable(FooterNavLink);
