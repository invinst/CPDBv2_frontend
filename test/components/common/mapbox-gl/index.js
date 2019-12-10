import React from 'react';
import { mount } from 'enzyme';

import MapboxGL from 'components/common/mapbox-gl';
import { mapboxgl } from 'utils/vendors';


describe('MapboxGL component', function () {
  beforeEach(function () {
    mapboxgl._resetHistory();
  });

  it('should add sources and layers on load', function (done) {
    const sources = [{
      name: 'abc',
      type: 'geojson',
      data: 'path/to/geojson',
    }];
    const layers = [{
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'abc',
      paint: {},
    }];
    const wrapper = mount(<MapboxGL sources={ sources } layers={ layers }/>);
    const instance = wrapper.instance();
    setTimeout(() => {
      instance._mapBox.addSource.calledWith('abc', {
        type: 'geojson',
        data: 'path/to/geojson',
      }).should.be.true();
      instance._mapBox.addLayer.calledWith({
        id: 'heatmap-layer',
        type: 'heatmap',
        source: 'abc',
        paint: {},
      }).should.be.true();
      done();
    }, 100);
  });

  it('should remove map on unmount', function () {
    const wrapper = mount(<MapboxGL/>);
    const instance = wrapper.instance();
    wrapper.unmount();
    instance._mapBox.remove.called.should.be.true();
  });

  it('should resize when previously is hidden', function () {
    const wrapper = mount(<MapboxGL hide={ true }/>);
    const instance = wrapper.instance();
    instance._mapBox.resize.should.not.be.called();

    wrapper.setProps({ hide: false });

    instance._mapBox.resize.should.be.calledOnce();
  });
});
