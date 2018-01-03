import React, { PropTypes } from 'react';
import { breadcrumbTextStyle, breadcrumbLinkStyle } from 'components/headers/breadcrumb-item-style';

export const breadcrumbItem = (props) => {
  let children;
  if (typeof props.children === 'string') {
    children = props.children;
  }
  else {
    children = React.cloneElement(props.children, {
      style: {
        ...props.children.props.style,
        ...breadcrumbLinkStyle
      }
    });
  }
  return (
    <li style={ breadcrumbTextStyle }>{children}</li>
  );
};

breadcrumbItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};
