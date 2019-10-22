import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './wrapper-link.sass';
import OutboundLink from 'components/common/outbound-link';


export default class WrapperLink extends Component {
  render() {
    const { url, to, children } = this.props;
    return (
      to
        ? <Link className={ styles.wrapperLink } to={ to }>{ children }</Link>
        : <OutboundLink className={ styles.wrapperLink } href={ url }>{ children }</OutboundLink>
    );
  }
}

WrapperLink.propTypes = {
  url: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
};
