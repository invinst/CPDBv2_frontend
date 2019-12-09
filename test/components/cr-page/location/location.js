import React from 'react';
import { shallow } from 'enzyme';

import Location from 'components/cr-page/location';
import CRLocationMap from 'components/cr-page/location/cr-location-map';
import ViewMapButton from 'components/cr-page/location/view-map-button';


describe('Location component', function () {
  it('should render map and view map button if point does exist', function () {
    const wrapper = shallow(<Location point={ { lat: 1, lon: 1 } } address='Address' />);
    wrapper.find(CRLocationMap).exists().should.be.true();
    wrapper.find(ViewMapButton).exists().should.be.true();
  });

  it('should not render map and view map button if point does not exist', function () {
    const wrapper = shallow(<Location />);
    wrapper.find(CRLocationMap).exists().should.be.false();
    wrapper.find(ViewMapButton).exists().should.be.false();
  });

  it('should not render address and ViewMapButton if address does not exist', function () {
    const wrapper = shallow(
      <Location
        point={ { lat: 1, lon: 1 } }
        location='Location'
        beat='Beat'
      />
    );
    wrapper.find(ViewMapButton).exists().should.be.false();
    wrapper.find('.test--location-address').exists().should.be.false();
  });

  it('should not render location if location does not exist', function () {
    const wrapper = shallow(
      <Location
        point={ { lat: 1, lon: 1 } }
        address='Address'
        beat='Beat'
      />
    );
    wrapper.find('.test--location-type').exists().should.be.false();
  });

  it('should not render beat if beat does not exist', function () {
    const wrapper = shallow(
      <Location
        point={ { lat: 1, lon: 1 } }
        address='Address'
        location='Location'
      />
    );
    wrapper.find('.test--location-beat').exists().should.be.false();
  });

  it('should render nothing if all point, address, location and beat do not exist', function () {
    const wrapper = shallow(<Location />);
    wrapper.find('.cr-page-location-section').exists().should.be.false();
  });
});
