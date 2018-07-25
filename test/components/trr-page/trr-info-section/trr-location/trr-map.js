import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import TRRMap from 'components/trr-page/trr-info-section/trr-location/trr_map';
import LocationMap from 'components/common/location-map';


describe('TRRMap component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render location map with trr map marker', function () {
    instance = renderIntoDocument(<TRRMap lng={ 1.1 } lat={ 1.2 } />);
    const locationMap = findRenderedComponentWithType(instance, LocationMap);
    locationMap.props.lng.should.eql(1.1);
    locationMap.props.lat.should.eql(1.2);
    locationMap.props.mapboxStyle.should.eql('mapbox://styles/mapbox/light-v9');

    locationMap.props.markerEl.props.className.should.eql('test--trr-map-marker');
  });
});
