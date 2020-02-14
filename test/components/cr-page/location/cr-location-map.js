import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';

import CRLocationMap from 'components/cr-page/location/cr-location-map';
import LocationMap from 'components/common/location-map';
import PrintMap from 'components/common/print-map';


describe('CRLocationMap component', function () {
  it('should render location map with default marker', function () {
    const wrapper = shallow(<CRLocationMap lng={ 1.1 } lat={ 1.2 } />);
    const locationMap = wrapper.find(LocationMap);
    locationMap.prop('lng').should.equal(1.1);
    locationMap.prop('lat').should.equal(1.2);
    locationMap.prop('mapboxStyle').should.equal('mapbox://styles/invisibleinstitute/cj8ugtswqe8dx2ss2kwhfnvte');

    should(locationMap.prop('customMarkerClassName')).be.undefined();
  });

  it('should render print map', function () {
    const wrapper = shallow(<CRLocationMap lng={ 1.1 } lat={ 1.2 }/>);
    const printMap = wrapper.find(PrintMap);
    printMap.prop('lng').should.equal(1.1);
    printMap.prop('lat').should.equal(1.2);
    printMap.prop('width').should.equal(1000);
    printMap.prop('height').should.equal(600);
  });
});
