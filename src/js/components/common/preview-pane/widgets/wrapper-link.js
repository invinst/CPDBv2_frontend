import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import styles from './wrapper-link.sass';
import OutboundLink from 'components/common/outbound-link';


export default class WrapperLink extends Component {
  render() {
    const { url, to, children } = this.props;

    if (!isEmpty(to)) {
      return <Link className={ styles.wrapperLink } to={ to }>{ children }</Link>;
    }

    if (!isEmpty(url)) {
      return <OutboundLink className={ styles.wrapperLink } href={ url }>{ children }</OutboundLink>;
    }

    return children;
  }
}

WrapperLink.propTypes = {
  url: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
};
