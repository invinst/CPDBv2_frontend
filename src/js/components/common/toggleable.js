import React, { PropTypes } from 'react';


export default function Toggleable(ComposedComponent) {
  class ToggleableComponent extends React.Component {
    onClick = () => {
      if (!this.props.active) {
        if (this.props.onOpen) {
          this.props.onOpen(this.props.identifier);
        }
      } else {
        if (this.props.onClose) {
          this.props.onClose(this.props.identifier);
        }
      }
    };

    render() {
      return (
        <div onClick={ this.onClick }>
          <ComposedComponent { ...this.props }/>
        </div>
      );
    }
  }

  ToggleableComponent.propTypes = {
    active: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    identifier: PropTypes.node,
  };

  return ToggleableComponent;
}
