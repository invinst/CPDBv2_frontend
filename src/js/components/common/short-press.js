import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';

import styles from './short-press.sass';


export default class ShortPress extends Component {
  constructor(props) {
    super(props);

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);

    this.mouseDownTime = undefined;
  }

  handleButtonPress() {
    this.mouseDownTime = new Date();
  }

  handleButtonRelease() {
    const { action } = this.props;

    if (new Date() - this.mouseDownTime < 250) {
      action();
    }

    this.mouseDownTime = undefined;
  }

  render() {
    const { children } = this.props;

    return (
      <div
        className={ styles.wrapper }
        onTouchStart={ this.handleButtonPress }
        onTouchEnd={ this.handleButtonRelease }
        onMouseDown={ this.handleButtonPress }
        onMouseUp={ this.handleButtonRelease }>
        { children }
      </div>
    );
  }
}

ShortPress.propTypes = {
  children: PropTypes.node,
  action: PropTypes.func,
};

ShortPress.defaultProps = {
  action: noop
};
