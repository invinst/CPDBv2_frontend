import React from 'react';
import { shallow } from 'enzyme';

import CommunityMap from 'components/embeddable-heat-map/community-map';
import MapboxGL from 'components/common/mapbox-gl';


describe('CommunityMap component', function () {
  it('should render MapboxGL', function (done) {
    const wrapper = shallow(<CommunityMap/>);
    setTimeout(() => {
      wrapper.find(MapboxGL).exists().should.be.true();
      done();
    }, 100);
  });
});
