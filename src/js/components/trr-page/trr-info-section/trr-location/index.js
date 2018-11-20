import React, { Component, PropTypes } from 'react';

import style from './trr-location.sass';
import Row from './row';
import TRRMap from './trr-map';


export default class TRRLocation extends Component {
  render() {
    const { address, incidentDate, beat, locationType, point } = this.props;
    return (
      <div className={ style.trrLocation }>
        <div className='trr-location-info'>
          <div className='info-block'>
            <h3 className='test--date-title info-block-title'>DATE OF INCIDENT</h3>
            <div className='test--date-value info-block-date'>{ incidentDate }</div>
          </div>

          <div className='info-block'>
            <h3 className='test--location-title info-block-title'>LOCATION</h3>
            <div>
              <Row title='LOCATION TYPE' value={ locationType }/>
              <Row title='ADDRESS' value={ address }/>
              <Row title='BEAT' value={ beat } hideBorder={ true }/>
            </div>
          </div>
        </div>
        <div className='trr-location-map'>
          { point ? <TRRMap lng={ point.lng } lat={ point.lat }/> : null }
        </div>
      </div>
    );
  }
}

TRRLocation.propTypes = {
  address: PropTypes.string,
  incidentDate: PropTypes.string,
  beat: PropTypes.string,
  locationType: PropTypes.string,
  point: PropTypes.object,
};
