import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './year.sass';


export default class Year extends Component {
  render() {
    const { date, hasData } = this.props.item;

    return (
      <div className={ styles.wrapper }>
        <div className={ cx('content', { 'no-data': !hasData }) }>
          <div className='date'>{ date }</div>
        </div>
      </div>
    );
  }
}

Year.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.number,
    hasData: PropTypes.bool,
  }),
};
