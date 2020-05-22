import React from 'react';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import CommunityMap from 'components/landing-page/heat-map/community-map';
import MapboxGL from 'components/common/mapbox-gl';


describe('CommunityMap component', function () {
  it('should render MapboxGL', function (done) {
    const heatMapLoadedSpy = spy();
    const wrapper = shallow(<CommunityMap heatMapLoaded={ heatMapLoadedSpy }/>);
    setTimeout(() => {
      const mapboxGlComponent = wrapper.find(MapboxGL);
      mapboxGlComponent.exists().should.be.true();
      mapboxGlComponent.first().prop('onIdle').should.equal(heatMapLoadedSpy);
      done();
    }, 100);
  });

  it('should update when hide prop is changed', function () {
    const wrapper = shallow(<CommunityMap hide={ true }/>);
    wrapper.instance().shouldComponentUpdate({ hide: false }).should.be.true();
  });
});
