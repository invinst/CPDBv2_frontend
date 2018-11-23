import React, { PropTypes, Component } from 'react';

import LocationMap from 'components/common/location-map';
import markerStyle from './trr-map-marker.sass';

const marker = (
  <div className={ markerStyle.trrMapMarker }>
    <div className='outer-circle'/>
    <div className='inner-circle'/>
  </div>
);

export default class TRRMap extends Component {

  render() {
    const { lng, lat } = this.props;
    return (
      <LocationMap
        lat={ lat }
        lng={ lng }
        markerEl={ marker }
      />
    );
  }
}

TRRMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};
