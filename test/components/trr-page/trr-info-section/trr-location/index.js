import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import TRRLocation from 'components/trr-page/trr-info-section/trr-location';
import Row from 'components/trr-page/trr-info-section/trr-location/row';
import TRRMap from 'components/trr-page/trr-info-section/trr-location/trr_map';


describe('TRRLocation component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render date and location info correctly', function () {
    const trrLocation = {
      address: '22XX Damen Ave',
      incidentDate: 'APR 18, 2004',
      beat: '1034',
      locationType: 'Police Facility/Veh Parking Lot',
      point: {
        lat: 41.7508596,
        lng: -87.6533166,
      },
    };

    instance = renderIntoDocument(<TRRLocation { ...trrLocation }/>);

    findRenderedDOMComponentWithClass(instance, 'test--date-title').textContent.should.eql('DATE OF INCIDENT');
    findRenderedDOMComponentWithClass(instance, 'test--date-value').textContent.should.eql('APR 18, 2004');
    findRenderedDOMComponentWithClass(instance, 'test--location-title').textContent.should.eql('LOCATION');

    const rows = scryRenderedComponentsWithType(instance, Row);
    const locationType = rows[0];
    const address = rows[1];
    const beat = rows[2];

    locationType.props.title.should.eql('LOCATION TYPE');
    locationType.props.value.should.eql('Police Facility/Veh Parking Lot');

    address.props.title.should.eql('ADDRESS');
    address.props.value.should.eql('22XX Damen Ave');

    beat.props.title.should.eql('BEAT');
    beat.props.value.should.eql('1034');
    beat.props.hideBorder.should.be.true();

    const map = findRenderedComponentWithType(instance, TRRMap);

    map.props.lat.should.eql(41.7508596);
    map.props.lng.should.eql(-87.6533166);
  });
});
