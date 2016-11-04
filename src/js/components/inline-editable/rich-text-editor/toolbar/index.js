import React, { Component, PropTypes } from 'react';

import LinkButton from './link-button';
import { wrapperStyle } from './toolbar.style';

class Toolbar extends Component {
  render() {
    const { linkActive, onLinkToggle, style } = this.props;

    return (
      <div style={ { ...wrapperStyle, ...style } }>
        <LinkButton
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
  style: PropTypes.object,
  onLinkToggle: PropTypes.func
};

export default Toolbar;
