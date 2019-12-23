import React, { Component, PropTypes } from 'react';


export default function (ComponentClass, WrapperElement = 'span', style, className) {
  class Hoverable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hovering: false,
      };
    }

    handleMouseOver = event => {
      this.setState({
        hovering: true,
      });
      const { onMouseOver } = this.props;
      if (onMouseOver) {
        onMouseOver(event);
      }
    };

    handleMouseOut = event => {
      this.setState({
        hovering: false,
      });
      const { onMouseOut } = this.props;
      if (onMouseOut) {
        onMouseOut(event);
      }
    };

    render() {
      const { hovering } = this.state;

      return (
        <WrapperElement
          onMouseOver={ this.handleMouseOver }
          onMouseOut={ this.handleMouseOut }
          className={ className }
          style={ style }
        >
          <ComponentClass hovering={ hovering } { ...this.props }/>
        </WrapperElement>
      );
    }
  }

  Hoverable.propTypes = {
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
  };

  return Hoverable;
}
