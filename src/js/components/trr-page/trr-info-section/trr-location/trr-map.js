import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import LocationMap from 'components/common/location-map';
import PrintMap from 'components/common/print-map';
import styles from './trr-map.sass';


export default function TRRMap(props) {
  const { lng, lat } = props;
  return (
    <div>
      <PrintMap lat={ lat } lng={ lng } width={ 1000 } height={ 394 } className={ styles.trrPrintMap }/>
      <LocationMap
        lat={ lat }
        lng={ lng }
        customMarkerClassName={ styles.trrMapMarker }
        className={ cx(styles.trrMap, 'no-print') } />
    </div>
  );
}

TRRMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};
