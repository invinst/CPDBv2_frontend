import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './plus-button.sass';


export class PlusButton extends Component {
  render() {
    const { className, onClick, darkMode } = this.props;
    return (
      <div className={ cx(styles.plusButton, className, { 'dark-mode': darkMode }) } onClick={ onClick } />
    );
  }
}

PlusButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
};

PlusButton.defaultProps = {
  darkMode: false,
};

export default PlusButton;
