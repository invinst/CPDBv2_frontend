import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import OutboundLink from 'components/common/outbound-link';


export default class WrappedWithLink extends Component {
  render() {
    const { to, url, ...passingProps } = this.props;

    if (to) {
      return <Link to={ to } { ...passingProps } />;
    }

    if (url) {
      return <OutboundLink href={ url } { ...passingProps } />;
    }

    return <div { ...passingProps } />;
  }
}

WrappedWithLink.propTypes = {
  to: PropTypes.string,
  url: PropTypes.string,
};
