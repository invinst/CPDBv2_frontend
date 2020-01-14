import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import OutboundLink from 'components/common/outbound-link';


export default function WrappedWithLink(props) {
  const { to, url, ...passingProps } = props;

  if (to) {
    return <Link to={ to } { ...passingProps } />;
  }

  if (url) {
    return <OutboundLink href={ url } { ...passingProps } />;
  }

  return <div { ...passingProps } />;
}

WrappedWithLink.propTypes = {
  to: PropTypes.string,
  url: PropTypes.string,
};
