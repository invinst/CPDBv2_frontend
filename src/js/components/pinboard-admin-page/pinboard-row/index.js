import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import pluralize from 'pluralize';

import styles from './pinboard-row.sass';

export default class PinboardRow extends Component {
  render() {
    const {
      id,
      title,
      createdAt,
      editModeOn,
      officersCount,
      allegationsCount,
      trrsCount,
    } = this.props;

    return (
      <div
        className={ cx(styles.row, { 'edit-mode': editModeOn }) }>
        <span className='pinboard-thumbnail'/>
        <span className='pinboard-id'>{ id }</span>
        <span className='pinboard-title'>{ title }</span>
        <span className='pinboard-pinned'>
          <span>{ `${pluralize('officer', officersCount, true)}, ` }</span>
          <span>{ `${pluralize('allegation', allegationsCount, true)} and ` }</span>
          <span>{ pluralize('TRR', trrsCount, true) }</span>
        </span>
        <span className='pinboard-date'>{ createdAt }</span>
      </div>
    );
  }
}

PinboardRow.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  editModeOn: PropTypes.bool,
  url: PropTypes.string,
};
