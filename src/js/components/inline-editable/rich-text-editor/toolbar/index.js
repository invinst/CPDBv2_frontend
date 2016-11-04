import React, { Component, PropTypes } from 'react';

import LinkButton from './link-button';
import { toobarStyle } from './toolbar.style';

class Toolbar extends Component {
  render() {
    const { linkActive, onLinkToggle } = this.props;

    return (
      <div>
        <LinkButton
          style={ toobarStyle }
          onLinkToggle={ onLinkToggle }
          active={ linkActive }>
          <span>L</span>
        </LinkButton>
      </div>
    );
  }
}

Toolbar.propTypes = {
  linkActive: PropTypes.bool,
  onLinkToggle: PropTypes.func
};

export default Toolbar;
