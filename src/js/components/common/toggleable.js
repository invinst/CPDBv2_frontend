import React, { PropTypes } from 'react';


export default function Toggleable(ComposedComponent) {
  class ToggleableComponent extends React.Component {
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
      this.displayName = 'ToggleableComponent';
    }

    onClick() {
      if (!this.props.active) {
        this.props.onOpen(this.props.identifier);
      } else {
        this.props.onClose(this.props.identifier);
      }
    }

    render() {
      return (
        <div onClick={ this.onClick }>
          <ComposedComponent {...this.props}/>
        </div>
      );
    }
  }

  ToggleableComponent.propTypes = {
    active: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    identifier: PropTypes.node
  };

  return ToggleableComponent;
}
