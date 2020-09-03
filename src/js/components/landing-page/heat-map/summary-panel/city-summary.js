import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import config from 'config';
import OutboundLink from 'components/common/outbound-link';

import styles from './city-summary.sass';


export default function CitySummary(props) {
  const { citySummary, isActive, onClick } = props;
  const { startYear, allegationCount, disciplinePercentage, totalLawsuitSettlements } = citySummary;

  return (
    <div className={ cx( styles.citySummary, 'link--transition test--city-summary', { 'is-active': isActive }) }>
      {
        isActive ?
          null :
          <div className='click-receiver' onClick={ onClick } />
      }
      <div className='city-summary-header'>
        Citizens Police Data Project collects and publishes data about police misconduct in Chicago.
      </div>
      <div className='lawsuit-info block-info'>
        <div className='info-label'>Lawsuits</div>
        <div className='lawsuit-info-summary info-summary'>
          Between 2014 and 2019, the City of Chicago paid&nbsp;
          <span className='total-lawsuit-settlements'>${totalLawsuitSettlements}</span>&nbsp;
          in settlements in police misconduct cases.
        </div>
        <OutboundLink href='' className='info-stories'>
          Read the lawsuit stories
        </OutboundLink>
      </div>
      <div className='complaint-info block-info'>
        <div className='info-label'>Complaints</div>
        <div className='complaint-info-summary info-summary'>
          Since {startYear}, there have been&nbsp;
          <span className='allegation-count'>{allegationCount? allegationCount.toLocaleString() : '0'}</span>&nbsp;
          allegations of misconduct against Chicago police officers.&nbsp;
          <span className='allegation-discipline-count'>{disciplinePercentage}%</span>&nbsp;
          of those allegations were&nbsp;
          <span className='disciplined'>disciplined.</span>
        </div>
        <OutboundLink
          href={ config.v1Url }
          className='info-stories'
        >
          Explore the complaints data
        </OutboundLink>
      </div>
    </div>
  );
}

CitySummary.propTypes = {
  citySummary: PropTypes.object,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

CitySummary.defaultProps = {
  citySummary: {},
};
