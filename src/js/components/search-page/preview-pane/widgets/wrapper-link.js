import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { linkStyle } from './wrapper-link.style';
import OutboundLink from 'components/common/outbound-link';


export default class WrapperLink extends Component {
  render() {
    const { url, to, children } = this.props;
    return (
      to
      ? <Link style={ linkStyle } to={ to }>{ children }</Link>
      : <OutboundLink style={ linkStyle } href={ url }>{ children }</OutboundLink>
    );
  }
}

WrapperLink.propTypes = {
  url: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
};
