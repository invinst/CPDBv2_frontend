import React, { Component, PropTypes } from 'react';

import styles from './left-navigation.sass';


export default class LeftNavigation extends Component {
  render() {
    const { text, onClickHandler } = this.props;

    return (
      <span
        className={ styles.leftNavigation }
        onClick={ onClickHandler }
      >
        <div className='left-arrow'/>
        { text }
      </span>
    );
  }
}

LeftNavigation.propTypes = {
  text: PropTypes.string,
  onClickHandler: PropTypes.func,
};
