import React from 'react';
import { unmountComponentAtNode, findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { reRender, unmountComponentSuppressError } from 'utils/test';
import MapboxGL from 'components/common/mapbox-gl';
import { mapboxgl } from 'utils/vendors';


describe('MapboxGL component', function () {
  let instance;

  beforeEach(function () {
    mapboxgl._resetHistory();
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    MapboxGL.should.be.renderable();
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
    instance = renderIntoDocument(<MapboxGL sources={ sources } layers={ layers }/>);
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
    instance = renderIntoDocument(<MapboxGL/>);
    unmountComponentAtNode(findDOMNode(instance).parentNode);
    instance._mapBox.remove.called.should.be.true();
  });

  it('should resize when previously is hidden', function () {
    instance = renderIntoDocument(<MapboxGL hide={ true }/>);
    instance._mapBox.resize.should.not.be.called();

    reRender(<MapboxGL hide={ false }/>, instance);

    instance._mapBox.resize.should.be.calledOnce();
  });
});
