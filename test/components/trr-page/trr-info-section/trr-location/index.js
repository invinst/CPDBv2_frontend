import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import TRRLocation from 'components/trr-page/trr-info-section/trr-location';
import Row from 'components/trr-page/trr-info-section/trr-location/row';
import TRRMap from 'components/trr-page/trr-info-section/trr-location/trr-map';


describe('TRRLocation component', function () {
  let instance;
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

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render date and location info correctly', function () {
    instance = renderIntoDocument(<TRRLocation { ...trrLocation } printMode={ false }/>);

    const titles = scryRenderedDOMComponentsWithClass(instance, 'info-block-title');
    titles.should.have.length(2);
    titles[0].textContent.should.eql('DATE OF INCIDENT');
    titles[1].textContent.should.eql('LOCATION');
    findRenderedDOMComponentWithClass(instance, 'info-block-date').textContent.should.eql('APR 18, 2004');

    const rows = scryRenderedComponentsWithType(instance, Row);
    const locationType = rows[0];
    const address = rows[1];
    const beat = rows[2];

    locationType.props.title.should.eql('location type');
    locationType.props.value.should.eql('Police Facility/Veh Parking Lot');

    address.props.title.should.eql('address');
    address.props.value.should.eql('22XX Damen Ave');

    beat.props.title.should.eql('beat');
    beat.props.value.should.eql('1034');

    const map = findRenderedComponentWithType(instance, TRRMap);

    map.props.lat.should.eql(41.7508596);
    map.props.lng.should.eql(-87.6533166);
  });

  it('should show hide and rearrange contents when printing', function () {
    instance = renderWithContext({ printMode: true }, <TRRLocation { ...trrLocation }/>);

    findRenderedDOMComponentWithClass(instance, 'location-title-print').textContent.should.eql('LOCATION');
    scryRenderedDOMComponentsWithClass(instance, 'trr-location-info').should.have.length(0);
    findRenderedDOMComponentWithClass(instance, 'info-block');
    findRenderedDOMComponentWithClass(instance, 'info-block-title').className.should.containEql('no-print');
  });
});
