import React, { PropTypes, Component } from 'react';

import { trackOutboundLink } from 'utils/google_analytics_tracking';


export default class OutboundLink extends Component {
  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const { onClick, href, target } = this.props;

    onClick();
    if (href) {
      trackOutboundLink(href, target);
    }
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <a
        { ...rest }
        onClick={ this.handleClick.bind(this) }
      >
        { children }
      </a>
    );
  }
}

OutboundLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  target: PropTypes.string,
};

OutboundLink.defaultProps = {
  onClick: () => {},
  target: '_blank'
};
