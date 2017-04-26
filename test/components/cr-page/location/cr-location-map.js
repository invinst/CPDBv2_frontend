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

  it('should re-add marker on rerender', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 0 } lat={ 0 } />);
    const oldMarker = instance.marker;

    instance = reRender(<CRLocationMap lng={ 1 } lat={ 1 } />, instance);

    instance.marker.should.not.equal(oldMarker);
  });

  it('should zoom in on rerender if it\'s zoom in already', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 0 } lat={ 0 } />);
    instance.handleMapClick();
    const zoomIn = spy(instance, 'zoomIn');
    instance = reRender(<CRLocationMap lng={ 1 } lat={ 1 } />, instance);
    zoomIn.called.should.be.true();
  });

  it('should handle zoomIn and zoomOut', function () {
    instance = renderIntoDocument(<CRLocationMap lng={ 1 } lat={ 1 } />);
    const zoomIn = spy(instance, 'zoomIn');
    const zoomOut = spy(instance, 'zoomOut');
    instance.handleMapClick();
    zoomIn.called.should.be.true();
    instance.handleMapClick();
    zoomOut.called.should.be.true();
  });
});
