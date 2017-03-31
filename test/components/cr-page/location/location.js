import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

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
    instance = renderIntoDocument(<Location point={ { lat: 1, long: 1 } } />);
    scryRenderedComponentsWithType(instance, CRLocationMap).should.have.length(1);
    scryRenderedComponentsWithType(instance, ViewMapButton).should.have.length(1);
  });

  it('should not render map and view map button if point does not exist', function () {
    instance = renderIntoDocument(<Location />);
    scryRenderedComponentsWithType(instance, CRLocationMap).should.have.length(0);
    scryRenderedComponentsWithType(instance, ViewMapButton).should.have.length(0);
  });
});
