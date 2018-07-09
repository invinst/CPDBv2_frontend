import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import LocationMap from 'components/common/location-map';


describe('LocationMap component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render location map', function () {
    instance = renderIntoDocument(<LocationMap lng={ 0 } lat={ 0 } />);
    findRenderedDOMComponentWithClass(instance, 'test--location-map');
  });

  it('should reset marker location on rerender', function () {
    instance = renderIntoDocument(<LocationMap lng={ 0 } lat={ 0 } />);
    instance.marker.setLngLat.resetHistory();

    instance = reRender(<LocationMap lng={ 1 } lat={ 1 } />, instance);
    instance.marker.setLngLat.calledWith([1, 1]).should.be.true();
  });

  it('should zoom out on rerender if it\'s zoom in already', function () {
    instance = renderIntoDocument(<LocationMap lng={ 0 } lat={ 0 } />);
    instance.handleMapClick();
    const zoomOutSpy = spy(instance, 'zoomOut');
    instance.map.getZoom.returns(13);
    instance = reRender(<LocationMap lng={ 1 } lat={ 1 } />, instance);
    zoomOutSpy.called.should.be.true();
    instance.map.getZoom.resetHistory();
  });

  it('should call zoomIn when click and map is zoomed out', function () {
    instance = renderIntoDocument(<LocationMap lng={ 1 } lat={ 1 } />);
    const zoomIn = spy(instance, 'zoomIn');
    instance.map.getZoom.returns(9);
    instance.handleMapClick();
    zoomIn.called.should.be.true();
    instance.map.getZoom.resetHistory();
  });

  it('should call zoomOut when click and map is zoomed in', function () {
    instance = renderIntoDocument(<LocationMap lng={ 1 } lat={ 1 } />);
    const zoomOut = spy(instance, 'zoomOut');
    instance.map.getZoom.returns(13);
    instance.handleMapClick();
    zoomOut.called.should.be.true();
    instance.map.getZoom.resetHistory();
  });
});
