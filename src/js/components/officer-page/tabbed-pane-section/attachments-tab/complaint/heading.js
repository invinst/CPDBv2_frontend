import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './heading.sass';


export default class Heading extends Component {

  render() {
    const { crid, category, finding, outcome, date, coaccused } = this.props.complaint;

    return (
      <Link to={ `/complaint/${crid}/` } className={ styles.heading }>
        <div className='heading-box'>
          <div className='heading-kind-wrapper'>
            <span className={ cx('attachments-heading-kind', { 'active': finding === 'Sustained' }) }>
              Complaint
            </span>
          </div>
          <span className='heading-detail'>
            <div className='attachments-heading-category'>
              { category }
            </div>
            <div className='attachments-heading-finding'>{ finding }, { outcome }</div>
          </span>
          <span className='heading-right'>
            <span className='attachments-heading-coaccused'>
              1 of { coaccused } coaccused
            </span>
            <span className='attachments-heading-date'>
              { date }
            </span>
          </span>
        </div>
      </Link>
    );
  }
}

Heading.propTypes = {
  complaint: PropTypes.object,
};
