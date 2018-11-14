import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Location from 'components/cr-page/location';
import CRLocationMap from 'components/cr-page/location/cr-location-map';
import ViewMapButton from 'components/cr-page/location/view-map-button';


describe('Location component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render map and view map button if point does exist', function () {
    instance = renderIntoDocument(<Location point={ { lat: 1, lon: 1 } } address='Address' />);
    scryRenderedComponentsWithType(instance, CRLocationMap).should.have.length(1);
    scryRenderedComponentsWithType(instance, ViewMapButton).should.have.length(1);
  });

  it('should not render map and view map button if point does not exist', function () {
    instance = renderIntoDocument(<Location />);
    scryRenderedComponentsWithType(instance, CRLocationMap).should.have.length(0);
    scryRenderedComponentsWithType(instance, ViewMapButton).should.have.length(0);
  });

  it('should not render address and ViewMapButton if address does not exist', function () {
    instance = renderIntoDocument(
      <Location
        point={ { lat: 1, lon: 1 } }
        location='Location'
        beat='Beat'
      />
    );
    scryRenderedComponentsWithType(instance, ViewMapButton).should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'test--location-address').should.have.length(0);
  });

  it('should not render location if location does not exist', function () {
    instance = renderIntoDocument(
      <Location
        point={ { lat: 1, lon: 1 } }
        address='Address'
        beat='Beat'
      />
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--location-type').should.have.length(0);
  });

  it('should not render beat if beat does not exist', function () {
    instance = renderIntoDocument(
      <Location
        point={ { lat: 1, lon: 1 } }
        address='Address'
        location='Location'
      />
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--location-beat').should.have.length(0);
  });

  it('should render nothing if all point, address, location and beat do not exist', function () {
    instance = renderIntoDocument(<Location />);
    scryRenderedDOMComponentsWithClass(instance, 'cr-page-location-section').should.have.length(0);
  });
});
