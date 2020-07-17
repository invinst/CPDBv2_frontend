import PropTypes from 'prop-types';
import React from 'react';
import { map } from 'lodash';
import cx from 'classnames';

import config from 'config';
import { categoryUrl } from 'utils/v1-url';
import OutboundLink from 'components/common/outbound-link';
import styles from './city-summary.sass';


export default function CitySummary(props) {
  const { citySummary, isActive, onClick } = props;
  const { startYear, endYear, allegationCount, disciplinePercentage, mostCommonComplaints } = citySummary;

  return (
    <div className={ cx( styles.citySummary, 'link--transition test--city-summary', { 'is-active': isActive }) }>
      {
        isActive ?
          null :
          <div className='click-receiver' onClick={ onClick } />
      }
      <div className='city-summary-header'>
        CHICAGO{ startYear ? ` ${startYear} - ${endYear}` : '' }
      </div>
      <OutboundLink href={ config.v1Url } className='allegation-discipline-link'>
        <div className='allegation-discipline-count'>
          <div className='allegation-text'>
            {
              allegationCount ?
                `${allegationCount.toLocaleString()} allegations` :
                null
            }
          </div>
          <div className='discipline-text'>
            {
              disciplinePercentage ?
                `${ disciplinePercentage }% disciplined` :
                null
            }
          </div>
        </div>
        <div className='right-arrow' />
      </OutboundLink>

      <div className='most-common-complaint'>MOST COMMON COMPLAINTS</div>
      <div className='test--most-common-complaints'>
        {
          map(mostCommonComplaints, ({ name, count }, index) => (
            <OutboundLink
              className='complaint-category'
              href={ isActive ? categoryUrl(name) : null }
              key={ index }>
              <div className='category-text-wrapper'>
                <div className='category-name'>{ name }</div>
                <div>{ count.toLocaleString() } allegations</div>
              </div>
              <div className='right-arrow' />
            </OutboundLink>
          ))
        }
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
