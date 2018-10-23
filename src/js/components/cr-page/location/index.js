import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import ViewMapButton from './view-map-button';
import CRLocationMap from './cr-location-map';
import {
  wrapperStyle, addressStyle, locationStyle, beatStyle, labelStyle, contentStyle, headerStyle
} from './location.style';


export default class Location extends Component {
  render() {
    const { point, address, location, beat } = this.props;

    return point || address || location || beat ? (
      <div style={ wrapperStyle } className='cr-page-location-section'>
        <div style={ headerStyle }>LOCATION</div>
        {
          point ? <CRLocationMap lng={ point.lon } lat={ point.lat }/> : null
        }
        {
          address ? (
            <div style={ addressStyle(isEmpty(location) && isEmpty(beat)) }>
              <span style={ labelStyle }>Address</span>
              <span style={ contentStyle } className='test--location-address'>{ address }</span>
              {
                point ? <ViewMapButton lng={ point.lon } lat={ point.lat }/> : null
              }
            </div>
          ) : null
        }
        {
          location ? (
            <div style={ locationStyle(isEmpty(beat)) }>
              <span style={ labelStyle }>Location Type</span>
              <span style={ contentStyle } className='test--location-type'>{ location }</span>
            </div>
          ) : null
        }
        {
          beat ? (
            <div style={ beatStyle }>
              <span style={ labelStyle }>Beat</span>
              <span style={ contentStyle } className='test--location-beat'>{ beat }</span>
            </div>
          ) : null
        }
      </div>
    ) : null;
  }
}

Location.propTypes = {
  point: PropTypes.object,
  address: PropTypes.string,
  location: PropTypes.string,
  beat: PropTypes.string
};
