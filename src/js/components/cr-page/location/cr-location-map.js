import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import LocationMap from 'components/common/location-map';
import styles from './cr-location-map.sass';
import { mapStyle } from './cr-location-map.style';
import printStyles from 'components/common/print.sass';


export default class CRLocationMap extends Component {
  render() {
    const { lat, lng } = this.props;

    return (
      <div>
        <div className={ cx(styles.crLocationMap, 'print-map') } style={ mapStyle(lat, lng) } />
        <LocationMap lat={ lat } lng={ lng } className={ cx(styles.crLocationMap, printStyles.noPrint) } />
      </div>
    );
  }
}

CRLocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};
