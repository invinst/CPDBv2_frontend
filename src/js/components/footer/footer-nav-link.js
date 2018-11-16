import React, { PropTypes } from 'react';
import cx from 'classnames';

import OutboundLink from 'components/common/outbound-link';
import styles from './foot-nav-link.sass';


class FooterNavLink extends React.Component {
  render() {
    const { name, externalHref, onClick, className } = this.props;

    return (
      <OutboundLink
        href={ externalHref }
        className={ cx(styles.footerNavLink, className) }
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
  className: PropTypes.string,
};

export default FooterNavLink;
