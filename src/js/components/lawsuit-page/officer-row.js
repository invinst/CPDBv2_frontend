import PropTypes from 'prop-types';
import React from 'react';
import pluralize from 'pluralize';

import styles from './officer-row.sass';
import StaticRadarChart from 'components/common/radar-chart';


export default function OfficerRow(props) {
  const { fullName, allegationCount, radarAxes, radarColor } = props;

  return (
    <div className={ styles.officerRow }>
      <div className='radar-char-container'>
        <StaticRadarChart
          width={ 34 }
          height={ 34 }
          radius={ 18 }
          hideAxisText={ true }
          data={ radarAxes }
          backgroundColor={ radarColor }
        />
      </div>
      <div className='officer-info'>
        <div>{ fullName }</div>
        <div className='allegation-count'>{ allegationCount } { pluralize('allegation', allegationCount) }</div>
      </div>
    </div>
  );
}

OfficerRow.propTypes = {
  fullName: PropTypes.string,
  url: PropTypes.string,
  allegationCount: PropTypes.number,
  radarAxes: PropTypes.array,
  radarColor: PropTypes.string,
};
