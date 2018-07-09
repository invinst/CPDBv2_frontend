import React from 'react';
import should from 'should';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CRLocationMap from 'components/cr-page/location/cr-location-map';
import LocationMap from 'components/common/location-map';


describe('CRLocationMap component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render location map with default marker', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 1.1 } lat={ 1.2 } />);
    const locationMap = findRenderedComponentWithType(instance, LocationMap);
    locationMap.props.lng.should.eql(1.1);
    locationMap.props.lat.should.eql(1.2);
    locationMap.props.mapboxStyle.should.eql('mapbox://styles/mapbox/streets-v10');

    should(locationMap.props.markerEl).be.null();
  });
});
