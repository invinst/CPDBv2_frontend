import React, { Component, PropTypes } from 'react';

import style from './trr-location.sass';
import Row from './row';
import TRRMap from './trr-map';
import printStyles from 'components/common/print.sass';
import Printable from 'components/common/higher-order/printable';


class TRRLocation extends Component {
  render() {
    const { address, incidentDate, beat, locationType, point, isPrinting } = this.props;
    const infoBlock = (
      <div className='info-block'>
        <h3 className={ `test--location-title info-block-title ${printStyles.hideForPrint}` }>
          LOCATION
        </h3>
        <div>
          <Row title='location type' value={ locationType } />
          <Row title='address' value={ address } />
          <Row title='beat' value={ beat } />
        </div>
      </div>
    );

    return (
      <div className={ style.trrLocation }>
        { isPrinting ? <h3 className='location-title-print'>LOCATION</h3> : null }
        <div className={ `trr-location-info ${printStyles.hideForPrint}` }>
          <div className='info-block'>
            <h3 className='test--date-title info-block-title'>DATE OF INCIDENT</h3>
            <div className='test--date-value info-block-date'>{ incidentDate }</div>
          </div>
          { infoBlock }
        </div>
        <div className='trr-location-map'>
          { point ? <TRRMap lng={ point.lng } lat={ point.lat }/> : null }
        </div>
        { isPrinting ? infoBlock : null }
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
  isPrinting: PropTypes.bool,
};

export default Printable(TRRLocation);
