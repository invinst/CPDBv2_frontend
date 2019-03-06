import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { omit } from 'lodash';


export default class WrappedWithLink extends Component {
  render() {
    const { to, url } = this.props;

    const passingProps = omit(this.props, ['to', 'url']);

    if (to) {
      return <Link to={ to } { ...passingProps } />;
    }

    if (url) {
      return <a href={ url } target='_blank' { ...passingProps } />;
    }

    return <div { ...passingProps } />;
  }
}

WrappedWithLink.propTypes = {
  to: PropTypes.string,
  url: PropTypes.string,
};
