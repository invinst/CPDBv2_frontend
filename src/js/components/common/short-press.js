import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'lodash';

import styles from './short-press.sass';

const PRESS_POSITION_THRESHOLD = 20;
const MOUSE_DOWN_TIME_THRESHOLD = 250;

export default class ShortPress extends Component {
  constructor(props) {
    super(props);

    this.mouseDownTime = undefined;
    this.mouseDownPosition = undefined;
  }

  handleButtonPress = event => {
    this.mouseDownTime = new Date();
    this.mouseDownPosition = { x: event.screenX, y: event.screenY };
  };

  handleButtonRelease = event => {
    const xPosition = event.screenX;
    const yPosition = event.screenY;
    const { action } = this.props;

    if (new Date() - this.mouseDownTime <= MOUSE_DOWN_TIME_THRESHOLD
      && Math.abs(xPosition - this.mouseDownPosition.x) <= PRESS_POSITION_THRESHOLD
      && Math.abs(yPosition - this.mouseDownPosition.y) <= PRESS_POSITION_THRESHOLD
    ) {
      action();
    }

    this.mouseDownTime = undefined;
  };

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
  action: noop,
};
