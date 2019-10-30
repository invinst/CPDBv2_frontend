import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './pinboard-row.sass';

export default class PinboardRow extends Component {
  render() {
    const {
      id,
      title,
      createdAt,
      pinnedCount,
      isHeader,
      onClick,
    } = this.props;

    return (
      <div className={ cx(styles.row, { 'header': isHeader }) } onClick={ onClick }>
        <span className='cell pinboard-id'>{ id }</span>
        <span className='cell pinboard-title'>{ title }</span>
        <span className='cell pinboard-pinned'>{ pinnedCount }</span>
        <span className='cell pinboard-date'>{ createdAt }</span>
      </div>
    );
  }
}

PinboardRow.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  pinnedCount: PropTypes.string,
  isHeader: PropTypes.bool,
  onClick: PropTypes.func,
};
