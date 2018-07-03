import React, { Component, PropTypes } from 'react';

import {
  wrapperStyle,
  mapWrapperStyle,
  infoStyle,
  infoBlockStyle,
  titleStyle,
  dateStyle,
} from './trr-location.style';
import Row from './row';
import TRRMap from './trr_map';


export default class TRRLocation extends Component {
  render() {
    const { address, incidentDate, beat, locationType, point } = this.props;
    return (
      <div style={ wrapperStyle }>
        <div style={ infoStyle }>
          <div style={ infoBlockStyle }>
            <h3 className='test--date-title' style={ titleStyle }>DATE OF INCIDENT</h3>
            <div className='test--date-value' style={ dateStyle }>{ incidentDate }</div>
          </div>

          <div style={ infoBlockStyle }>
            <h3 className='test--location-title' style={ titleStyle }>LOCATION</h3>
            <div>
              <Row title='LOCATION TYPE' value={ locationType }/>
              <Row title='ADDRESS' value={ address }/>
              <Row title='BEAT' value={ beat } hideBorder={ true }/>
            </div>
          </div>
        </div>
        <div style={ mapWrapperStyle }>
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
