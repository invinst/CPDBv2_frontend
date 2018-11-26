import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import LocationMap from 'components/common/location-map';
import styles from './cr-location-map.sass';
import printStyles from 'components/common/print.sass';
import { getPrintMapUrl } from 'utils/mapbox';


export default class CRLocationMap extends Component {
  render() {
    const { lat, lng } = this.props;

    return (
      <div>
        <img src={ getPrintMapUrl(lat, lng, 1000, 600) } className={ cx(styles.crLocationMap, 'print-map') }/>
        <LocationMap lat={ lat } lng={ lng } className={ cx(styles.crLocationMap, printStyles.noPrint) } />
      </div>
    );
  }
}

CRLocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};
