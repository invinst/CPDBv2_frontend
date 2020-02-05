import PropTypes from 'prop-types';
import React from 'react';
import { isEmpty } from 'lodash';

import NavigationWrapper from 'utils/navigation-wrapper';
import styles from './wrapper-link.sass';
import OutboundLink from 'components/common/outbound-link';


export default function WrapperLink(props) {
  const { url, to, children } = props;

  if (!isEmpty(to)) {
    return <NavigationWrapper className={ styles.wrapperLink } to={ to }>{ children }</NavigationWrapper>;
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
