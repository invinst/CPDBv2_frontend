import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import OutboundLink from 'components/common/outbound-link';
import styles from './foot-nav-link.sass';


function FooterNavLink(props) {
  const { name, externalHref, onClick, className } = props;

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

FooterNavLink.propTypes = {
  externalHref: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default FooterNavLink;
