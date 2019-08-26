import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

import styles from './simple-popup.sass';


export default class SimplePopup extends Component {
  render() {
    const { id, children } = this.props;

    return (
      <ReactTooltip
        id={ id }
        className={ cx('popup', styles.simplePopup) }
        effect='solid'
        type='light'
      >
        { children }
      </ReactTooltip>
    );
  }
}

SimplePopup.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};
