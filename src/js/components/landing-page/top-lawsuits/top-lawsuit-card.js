import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { lawsuitPath } from 'utils/paths';

import style from './top-lawsuit-card.sass';


const TopLawsuitCard = (props) => {
  const { caseNo, incidentDate, primaryCause, summary } = props;

  return (
    <Link
      to={ lawsuitPath(caseNo) }
      className={ style.topLawsuitCard }
    >
      <div className='top-lawsuit-card-title'>
        <div className='top-lawsuit-card-title-date'>{ incidentDate }</div>
        <div className='top-lawsuit-card-title-primary-cause'>{ primaryCause }</div>
      </div>
      <div className='top-lawsuit-card-summary'>
        { summary }
        <div className='top-lawsuit-card-summary-gradient'/>
      </div>
    </Link>
  );
};

TopLawsuitCard.propTypes = {
  caseNo: PropTypes.string,
  incidentDate: PropTypes.string,
  primaryCause: PropTypes.string,
  summary: PropTypes.string,
};

export default TopLawsuitCard;
