import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './breadcrumbs-item.sass';


export default function BreadcrumbsItemRenderer(props) {
  let newChildren;
  const { scrollPosition, children } = props;
  const atBottom = scrollPosition === 'bottom';

  if (typeof children === 'string') {
    newChildren = children;
  }
  else {
    newChildren = React.cloneElement(children, {
      style: children.props.style,
      className: cx(children.props.className, 'breadcrumbs-item-link', { 'bottom': atBottom }),
    });
  }
  return (
    <li className={ cx(styles.breadcrumbsItem, { 'bottom': atBottom }) } >{ newChildren }</li>
  );
}

BreadcrumbsItemRenderer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  scrollPosition: PropTypes.string,
};

BreadcrumbsItemRenderer.defaultProps = {
  scrollPosition: 'top',
};
