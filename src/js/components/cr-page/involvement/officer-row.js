import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { isNil } from 'lodash';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './officer-row.sass';


function OfficerRow(props) {
  const { id, fullName, officerSlug, extraInfo, radarAxes, radarColor, tag } = props;

  return (
    <Link
      className={ cx(styles.officerRow, 'test--officer-row', { 'hoverable': !isNil(id) }) }
      to={ id ? `/officer/${id}/${officerSlug}/` : `/search/?terms=${fullName}` }>
      <div className='chart-wrapper no-print'>
        <StaticRadarChart
          width={ 32 }
          height={ 32 }
          radius={ 15 }
          data={ radarAxes }
          { ...radarColor }/>
      </div>
      <div className='right-wrapper'>
        <div className='officer-name'>{ fullName }</div>
        <div className='extra-info'>{ extraInfo }</div>
      </div>
      <div className='tag-wrapper'>
        {
          tag ? (
            <span className='tag'>{ tag }</span>
          ) : null
        }
      </div>
    </Link>
  );
}

OfficerRow.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
  extraInfo: PropTypes.string,
  radarColor: PropTypes.object,
  radarAxes: PropTypes.array,
  tag: PropTypes.string,
  officerSlug: PropTypes.string,
};

export default OfficerRow;
