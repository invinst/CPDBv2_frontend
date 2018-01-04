import React, { PropTypes } from 'react';
import { breadcrumbTextStyle, breadcrumbLinkStyle } from 'components/headers/shareable-header/breadcrumbs-item-style';

export default class BreadcrumbsItem extends React.Component {
  render() {
    let children;
    if (typeof this.props.children === 'string') {
      children = this.props.children;
    }
    else {
      children = React.cloneElement(this.props.children, {
        style: {
          ...this.props.children.props.style,
          ...breadcrumbLinkStyle
        }
      });
    }
    return (
      <li className='test--breadcrumbs-item' style={ breadcrumbTextStyle }>{children}</li>
    );
  }
}

BreadcrumbsItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};
