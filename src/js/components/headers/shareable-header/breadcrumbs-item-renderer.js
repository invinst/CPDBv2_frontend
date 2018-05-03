import React, { PropTypes } from 'react';
import { breadcrumbTextStyle, breadcrumbLinkStyle } from 'components/headers/shareable-header/breadcrumbs-item.style';
import Hoverable from 'components/common/higher-order/hoverable';

class BreadcrumbsItemRenderer extends React.Component {
  render() {
    let children;

    const scrollPosition = this.props.scrollPosition;
    if (typeof this.props.children === 'string') {
      children = this.props.children;
    }
    else {
      const { hovering } = this.props;
      children = React.cloneElement(this.props.children, {
        style: {
          ...this.props.children.props.style,
          ...breadcrumbLinkStyle(scrollPosition, hovering)
        }
      });
    }
    return (
      <li className='test--breadcrumbs-item' style={ breadcrumbTextStyle(scrollPosition) }>{ children }</li>
    );
  }
}

BreadcrumbsItemRenderer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  scrollPosition: PropTypes.string,
  hovering: PropTypes.bool,
};

BreadcrumbsItemRenderer.defaultProps = {
  scrollPosition: 'top',
};

export default Hoverable(BreadcrumbsItemRenderer);
