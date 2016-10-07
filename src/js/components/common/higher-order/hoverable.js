import React, { Component } from 'react';
import isMobile from 'ismobilejs';


export default function (ComponentClass) {
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
    }

    handleMouseOut(event) {
      if (isMobile.any) {
        return;
      }
      this.setState({
        hovering: false
      });
    }

    render() {
      const { hovering } = this.state;
      return (
        <span
          onMouseOver={ this.handleMouseOver }
          onMouseOut={ this.handleMouseOut }>
          <ComponentClass hovering={ hovering } { ...this.props }/>
        </span>
      );
    }
  }

  return Hoverable;
}
