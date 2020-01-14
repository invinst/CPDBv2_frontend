import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import styles from './wrapper-link.sass';
import OutboundLink from 'components/common/outbound-link';


export default function WrapperLink(props) {
  const { url, to, children } = props;

  if (!isEmpty(to)) {
    return <Link className={ styles.wrapperLink } to={ to }>{ children }</Link>;
  }

  if (!isEmpty(url)) {
    return <OutboundLink className={ styles.wrapperLink } href={ url }>{ children }</OutboundLink>;
  }

  return children;
}

WrapperLink.propTypes = {
  url: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
};
