import React, { PropTypes } from 'react';

import { linkStyle } from './underlined-link.style';


export default class UnderlinedLink extends React.Component {
  render() {
    return (
      <a href={ this.props.href } style={ linkStyle }>
        { this.props.children }
      </a>
    );
  }
}

UnderlinedLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
};
