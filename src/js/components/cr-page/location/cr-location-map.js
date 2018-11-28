import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import LocationMap from 'components/common/location-map';
import styles from './cr-location-map.sass';
import printStyles from 'components/common/print.sass';
import PrintMap from 'components/common/print-map';


export default class CRLocationMap extends Component {
  render() {
    const { lat, lng } = this.props;

    return (
      <div>
        <PrintMap lat={ lat } lng={ lng } width={ 1000 } height={ 600 } className={ styles.crPrintMap } />
        <LocationMap lat={ lat } lng={ lng } className={ cx(styles.crLocationMap, printStyles.noPrint) } />
      </div>
    );
  }
}

CRLocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};
