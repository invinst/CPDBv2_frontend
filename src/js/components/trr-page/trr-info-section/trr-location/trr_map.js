import React, { PropTypes, Component } from 'react';

import { innerCircleStyle, outerCircleStyle } from './trr-map.style';
import LocationMap from 'components/common/location-map';


export default class TRRMap extends Component {

  render() {
    const { lng, lat } = this.props;
    const marker = (
      <div className='test--trr-map-marker'>
        <div style={ outerCircleStyle }/>
        <div style={ innerCircleStyle }/>
      </div>
    );

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
