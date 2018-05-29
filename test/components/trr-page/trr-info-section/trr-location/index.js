import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import TRRLocation from 'components/trr-page/trr-info-section/trr-location';
import Row from 'components/trr-page/trr-info-section/trr-location/row';


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
  });
});
