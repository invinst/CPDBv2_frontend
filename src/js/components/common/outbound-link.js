import React, { PropTypes, Component } from 'react';

import { trackOutboundLink } from 'utils/tracking';


export default class OutboundLink extends Component {
  handleClick(event) {
    event.preventDefault();
    this.props.onClick();
    trackOutboundLink(this.props.href);
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
  onClick: PropTypes.func
};

OutboundLink.defaultProps = {
  onClick: () => {}
};
