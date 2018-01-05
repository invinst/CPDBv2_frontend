import React, { PropTypes } from 'react';

import { navStyle } from './footer-nav-link.style';


class FooterNavLink extends React.Component {
  render() {
    const { name, externalHref, onClick } = this.props;

    return (
      <a
        href={ externalHref }
        style={ { ...navStyle, ...this.props.style } }
        onClick={ onClick }
      >
        { name }
      </a>
    );

  }
}

FooterNavLink.propTypes = {
  externalHref: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
};

export default FooterNavLink;
