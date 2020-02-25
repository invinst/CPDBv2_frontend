import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import MapboxGL from 'components/common/mapbox-gl';
import { mapboxgl } from 'utils/vendors';

const { stub } = sinon;


describe('MapboxGL component', function () {
  beforeEach(function () {
    mapboxgl._resetHistory();
  });

  it('should add sources and layers on load', function (done) {
    const sources = [{
      name: 'unknown source',
      type: 'geojson',
      data: 'path/to/geojson',
    },
    {
      name: 'added source',
      type: 'geojson',
      data: 'path/to/geojson',
    }];

    const layers = [{
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'added source',
      paint: {},
    }];

    const mapboxOnStub = stub(mapboxgl.Map.prototype, 'on').callsFake(
      (action, callback) => action !== 'resize' && callback()
    );
    const wrapper = mount(<MapboxGL sources={ sources } layers={ layers }/>);
    const instance = wrapper.instance();

    setTimeout(() => {
      instance._mapBox.addSource.should.be.calledOnce();
      instance._mapBox.setMaxBounds.should.be.calledOnce();
      instance._mapBox.setMaxBounds.should.be.calledWith(instance._mapBox.getBounds());
      instance._mapBox.addSource.calledWith('unknown source', {
        type: 'geojson',
        data: 'path/to/geojson',
      }).should.be.true();
      instance._mapBox.addLayer.calledWith({
        id: 'heatmap-layer',
        type: 'heatmap',
        source: 'added source',
        paint: {},
      }).should.be.true();
      mapboxOnStub.restore();
      done();
    }, 100);
  });

  it('should remove map on unmount', function () {
    const wrapper = mount(<MapboxGL/>);
    const instance = wrapper.instance();
    wrapper.unmount();
    instance._mapBox.remove.called.should.be.true();
  });
});
