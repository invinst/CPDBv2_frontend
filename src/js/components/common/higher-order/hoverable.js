import React, { Component, PropTypes } from 'react';
import isMobile from 'ismobilejs';


export default function (ComponentClass, WrapperElement = 'span', display = 'inline') {
  class Hoverable extends Component {
    constructor(props) {
      super(props);
      this.handleMouseOver = this.handleMouseOver.bind(this);
      this.handleMouseOut = this.handleMouseOut.bind(this);
      this.state = {
        hovering: false
      };
    }

    handleMouseOver(event) {
      if (isMobile.any) {
        return;
      }
      this.setState({
        hovering: true
      });
      const { onMouseOver } = this.props;
      if (onMouseOver) {
        onMouseOver(event);
      }
    }

    handleMouseOut(event) {
      if (isMobile.any) {
        return;
      }
      this.setState({
        hovering: false
      });
      const { onMouseOut } = this.props;
      if (onMouseOut) {
        onMouseOut(event);
      }
    }

    render() {
      const { hovering } = this.state;

      return (
        <WrapperElement
          onMouseOver={ this.handleMouseOver }
          onMouseOut={ this.handleMouseOut }
          style={ { display } }
        >
          <ComponentClass hovering={ hovering } { ...this.props }/>
        </WrapperElement>
      );
    }
  }

  Hoverable.propTypes = {
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func
  };

  return Hoverable;
}
