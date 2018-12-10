import React, { Component, PropTypes } from 'react';

import styles from './right-navigation.sass';


export default class RightNavigation extends Component {
  render() {
    const { text, onClickHandler } = this.props;

    return (
      <span
        className={ styles.rightNavigation }
        onClick={ onClickHandler }
      >
        { text }
        <div className='right-arrow'/>
      </span>
    );
  }
}

RightNavigation.propTypes = {
  text: PropTypes.string,
  onClickHandler: PropTypes.func,
};
