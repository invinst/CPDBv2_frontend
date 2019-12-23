import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import LocationMap from 'components/common/location-map';
import styles from './cr-location-map.sass';
import PrintMap from 'components/common/print-map';


export default function CRLocationMap(props) {
  const { lat, lng } = props;

  return (
    <div>
      <PrintMap lat={ lat } lng={ lng } width={ 1000 } height={ 600 } className={ styles.crPrintMap } />
      <LocationMap lat={ lat } lng={ lng } className={ cx(styles.crLocationMap, 'no-print') } />
    </div>
  );
}

CRLocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};
