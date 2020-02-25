import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import { trackOutboundLink } from 'utils/tracking';
import styles from './outbound-link.sass';


export default class OutboundLink extends Component {
  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { onClick, href, target } = this.props;

    onClick();
    if (href) {
      trackOutboundLink(href, target);
    }
  };

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div
        { ...rest }
        className={ cx(styles.outboundLink, className) }
        onClick={ this.handleClick }
      >
        { children }
      </div>
    );
  }
}

OutboundLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  target: PropTypes.string,
  className: PropTypes.string,
};

OutboundLink.defaultProps = {
  onClick: () => {},
  target: '_blank',
};
