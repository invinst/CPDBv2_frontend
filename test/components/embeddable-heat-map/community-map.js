import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CommunityMap from 'components/embeddable-heat-map/community-map';
import MapboxGL from 'components/common/mapbox-gl';


describe('CommunityMap component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render MapboxGL', function (done) {
    instance = renderIntoDocument(<CommunityMap/>);
    setTimeout(() => {
      findRenderedComponentWithType(instance, MapboxGL).should.be.ok();
      done();
    }, 100);
  });
});
