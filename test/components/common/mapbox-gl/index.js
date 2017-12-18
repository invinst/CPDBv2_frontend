import React from 'react';

import MapboxGL from 'components/common/mapbox-gl';
import mapboxgl from 'utils/mapbox-gl';


describe('MapboxGL component', function () {
  beforeEach(function () {
    mapboxgl.Map.reset();
  });

  it('should renderable', function () {
    MapboxGL.should.be.renderable();
    mapboxgl.Map.called.should.be.true();
  });
});
