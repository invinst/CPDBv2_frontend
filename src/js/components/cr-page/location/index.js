import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import ViewMapButton from './view-map-button';
import CRLocationMap from './cr-location-map';
import styles from './location.sass';


export default class Location extends Component {
  render() {
    const { point, address, location, beat } = this.props;

    return point || address || location || beat ? (
      <div className={ cx(styles.location, 'cr-page-location-section') }>
        <div className='location-header'>LOCATION</div>
        {
          point ? <CRLocationMap lng={ point.lon } lat={ point.lat }/> : null
        }
        {
          address ? (
            <div className='location-row'>
              <span className='label no-print'>Address</span>
              <span className={ cx('content', 'test--location-address') }>{ address }</span>
              {
                point ? <ViewMapButton lng={ point.lon } lat={ point.lat }/> : null
              }
            </div>
          ) : null
        }
        {
          location ? (
            <div className='location-row'>
              <span className='label no-print'>Location Type</span>
              <span className={ cx('content', 'test--location-type') }>{ location }</span>
            </div>
          ) : null
        }
        {
          beat ? (
            <div className='location-row'>
              <span className='label'>Beat</span>
              <span className={ cx('content', 'test--location-beat') }>{ beat }</span>
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
