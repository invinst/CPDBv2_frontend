import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import HeatMap from 'components/landing-page/heat-map';
import MapboxGL from 'components/common/mapbox-gl';


describe('HeatMap component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    HeatMap.should.be.renderable();
  });

  it('should render MapboxGL component', function () {
    instance = renderIntoDocument(<HeatMap/>);
    findRenderedComponentWithType(instance, MapboxGL).should.be.ok();
  });
});
