import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './heading.sass';


export default function Heading(props) {
  const { misconduct, caseNo, outcome, date } = props.lawsuit;

  return (
    <Link to={ `/lawsuit/${caseNo}/` } className={ styles.heading }>
      <div className='heading-box'>
        <div className='heading-kind-wrapper'>
          <span className={ cx('attachments-heading-kind') }>
            Lawsuit
          </span>
        </div>
        <span className='heading-detail'>
          <div className='attachments-heading-misconduct'>
            { misconduct }
          </div>
          <div className='attachments-heading-outcome'>{ outcome }</div>
        </span>
        <span className='heading-right'>
          <span className='attachments-heading-date'>
            { date }
          </span>
        </span>
      </div>
    </Link>
  );
}

Heading.propTypes = {
  lawsuit: PropTypes.object,
};
