import PropTypes from 'prop-types';
import React, { Component, cloneElement } from 'react';
import isMobile from 'ismobilejs';


export default class HoverStyleChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.onMouseOut = () => { this.setState({ hover: false }); };
    this.onMouseOver = () => { this.setState({ hover: true }); };
    if (isMobile.any) {
      this.onMouseOver = null;
      this.onMouseOut = null;
    }
  }

  renderChildren() {
    const { children, styleChange } = this.props;
    if (this.state.hover) {
      return cloneElement(children, { style: styleChange });
    }
    return children;
  }

  render() {
    return (
      <div onMouseOut={ this.onMouseOut } onMouseOver={ this.onMouseOver }>
        { this.renderChildren() }
      </div>
    );
  }
}

HoverStyleChange.propTypes = {
  children: PropTypes.element,
  styleChange: PropTypes.object,
};
