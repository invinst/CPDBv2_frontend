import { Link } from 'react-router';
import { linkStyle } from './wrapper-link.style';
import OutboundLink from 'components/common/outbound-link';
import React from 'react';


const WrapperLink = ({ url, to, children }) => (
  to
    ? <Link style={ linkStyle } to={ to }>{ children }</Link>
    : <OutboundLink style={ linkStyle } href={ url }>{ children }</OutboundLink>
);

export default WrapperLink;
