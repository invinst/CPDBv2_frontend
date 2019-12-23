import React, { PropTypes } from 'react';
import cx from 'classnames';

import LocationMap from 'components/common/location-map';
import PrintMap from 'components/common/print-map';
import markerStyle from './trr-map-marker.sass';
import styles from './trr-map.sass';

const marker = (
  <div className={ markerStyle.trrMapMarker }>
    <div className='outer-circle'/>
    <div className='inner-circle'/>
  </div>
);

export default function TRRMap(props) {
  const { lng, lat } = props;
  return (
    <div>
      <PrintMap lat={ lat } lng={ lng } width={ 1000 } height={ 394 } className={ styles.trrPrintMap }/>
      <LocationMap lat={ lat } lng={ lng } markerEl={ marker } className={ cx(styles.trrMap, 'no-print') }/>
    </div>
  );
}

TRRMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};
