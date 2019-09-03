import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './toggle.sass';


export default class Toggle extends Component {
  handleClick(event) {
    const { on, onChange } = this.props;
    event.stopPropagation();
    onChange(on);
  }

  render() {
    const { on, children } = this.props;

    return (
      <span
        className={ cx(styles.wrapper, { 'toggle-on': on }) }
        onClick={ this.handleClick.bind(this) }>
        <i className='toggle-icon'/>
        <span className='toggle-text'>{ children }</span>
      </span>
    );
  }
}

Toggle.propTypes = {
  on: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node,
};
