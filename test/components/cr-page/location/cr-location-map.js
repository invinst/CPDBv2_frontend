import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import CRLocationMap from 'components/cr-page/location/cr-location-map';


describe('CRLocationMap component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render location map', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 0 } lat={ 0 } />);
    scryRenderedDOMComponentsWithClass(instance, 'test--cr-location-map').should.have.length(1);
  });

  it('should reset marker location on rerender', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 0 } lat={ 0 } />);
    instance.marker.setLngLat.resetHistory();

    instance = reRender(<CRLocationMap lng={ 1 } lat={ 1 } />, instance);
    instance.marker.setLngLat.calledWith([1, 1]).should.be.true();
  });

  it('should zoom out on rerender if it\'s zoom in already', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 0 } lat={ 0 } />);
    instance.handleMapClick();
    const zoomOutSpy = spy(instance, 'zoomOut');
    instance.map.getZoom.returns(13);
    instance = reRender(<CRLocationMap lng={ 1 } lat={ 1 } />, instance);
    zoomOutSpy.called.should.be.true();
    instance.map.getZoom.resetHistory();
  });

  it('should call zoomIn when click and map is zoomed out', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 1 } lat={ 1 } />);
    const zoomIn = spy(instance, 'zoomIn');
    instance.map.getZoom.returns(9);
    instance.handleMapClick();
    zoomIn.called.should.be.true();
    instance.map.getZoom.resetHistory();
  });

  it('should call zoomOut when click and map is zoomed in', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 1 } lat={ 1 } />);
    const zoomOut = spy(instance, 'zoomOut');
    instance.map.getZoom.returns(13);
    instance.handleMapClick();
    zoomOut.called.should.be.true();
    instance.map.getZoom.resetHistory();
  });
});
