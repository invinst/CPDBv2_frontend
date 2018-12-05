import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import TRRMap from 'components/trr-page/trr-info-section/trr-location/trr-map';
import LocationMap from 'components/common/location-map';
import PrintMap from 'components/common/print-map';


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
    locationMap.props.mapboxStyle.should.eql('mapbox://styles/invisibleinstitute/cj8ugtswqe8dx2ss2kwhfnvte');

    locationMap.props.markerEl.props.className.should.containEql('trr-map-marker');
  });

  it('should render print map', function () {
    instance = renderIntoDocument(<TRRMap lng={ 1.1 } lat={ 1.2 }/>);
    const printMap = findRenderedComponentWithType(instance, PrintMap);
    printMap.props.lng.should.eql(1.1);
    printMap.props.lat.should.eql(1.2);
    printMap.props.width.should.eql(1000);
    printMap.props.height.should.eql(394);
  });
});
