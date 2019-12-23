import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { kebabCase } from 'lodash';

import NavigationButton from './navigation-button';
import StaticRadarChart from 'components/common/radar-chart';
import style from './officer-row.sass';


export default function OfficerRow(props) {
  const { percentile, fullName, officerId, rank } = props;
  const officerSlug = kebabCase(fullName);

  const visualTokenConfig = percentile ? {
    backgroundColor: percentile.visualTokenBackground,
    data: percentile.items,
  } : {};

  return (
    <Link
      className={ `navigation-button-container ${style.trrOfficerRow}` }
      to={ `/officer/${officerId}/${officerSlug}/` }
    >
      <div className={ 'trr-officer-row-visual-token no-print' }>
        <StaticRadarChart { ...visualTokenConfig }/>
      </div>
      <div className='trr-officer-row-name'>
        <div className='trr-officer-row-rank'>{ rank }</div>
        <div className='trr-officer-full-name'>{ fullName }</div>
      </div>
      <NavigationButton text='View Profile'/>
    </Link>
  );
}

OfficerRow.propTypes = {
  percentile: PropTypes.object,
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  rank: PropTypes.string,
  officerSlug: PropTypes.string,
};
