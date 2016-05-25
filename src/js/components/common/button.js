import React, { PropTypes, Component } from 'react';

import { buttonStyle } from './button.style';


export default class ButtonComponent extends Component {
  render() {
    return (
      <button style={ buttonStyle } onClick={ this.props.onClick }>
        { this.props.children }
      </button>
    );
  }
}

ButtonComponent.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
};
