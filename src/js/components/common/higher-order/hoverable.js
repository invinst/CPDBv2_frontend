import React, { Component } from 'react';
import ConfiguredRadium from 'utils/configured-radium';


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
      this.setState({
        hovering: true
      });
    }

    handleMouseOut(event) {
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
          <ComponentClass { ...this.props } hovering={ hovering }/>
        </span>
      );
    }
  }
  return ConfiguredRadium(Hoverable);
}
