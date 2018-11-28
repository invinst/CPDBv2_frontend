import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './right-navigation.sass';


export default class RightNavigation extends Component {
  render() {
    const { text, onClickHandler } = this.props;

    return (
      <span
        className={ cx(styles.rightNavigation, 'test--radar-explainer-navigation-right') }
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
  hovering: PropTypes.bool,
};
