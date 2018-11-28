import React from 'react';
import should from 'should';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CRLocationMap from 'components/cr-page/location/cr-location-map';
import LocationMap from 'components/common/location-map';
import PrintMap from 'components/common/print-map';


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
    locationMap.props.mapboxStyle.should.eql('mapbox://styles/invisibleinstitute/cj8ugtswqe8dx2ss2kwhfnvte');

    should(locationMap.props.markerEl).be.null();
  });

  it('should render print map', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 1.1 } lat={ 1.2 }/>);
    const printMap = findRenderedComponentWithType(instance, PrintMap);
    printMap.props.lng.should.eql(1.1);
    printMap.props.lat.should.eql(1.2);
    printMap.props.width.should.eql(1000);
    printMap.props.height.should.eql(600);
  });
});
