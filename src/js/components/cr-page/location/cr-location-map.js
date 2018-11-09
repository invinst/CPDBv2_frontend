import React, { PropTypes, Component } from 'react';

import LocationMap from 'components/common/location-map';
import styles from './cr-location-map.sass';


export default class CRLocationMap extends Component {
  render() {
    const { lat, lng } = this.props;

    return (
      <LocationMap lat={ lat } lng={ lng } className={ styles.crLocationMap } />
    );
  }
}

CRLocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};
