import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './heading.sass';


export default function Heading(props) {
  const { caseNo, primaryCause, date } = props.lawsuit;

  return (
    <Link to={ `/lawsuit/${caseNo}/` } className={ styles.heading }>
      <div className='heading-box'>
        <div className='heading-kind-wrapper'>
          <span className={ cx('attachments-heading-kind') }>
            Lawsuit
          </span>
        </div>
        <span className='heading-detail'>
          <div className='attachments-heading-title'>
            { primaryCause }
          </div>
          <div className='attachments-heading-subtitle'>{ caseNo }</div>
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
