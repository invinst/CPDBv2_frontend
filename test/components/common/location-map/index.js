import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import LocationMap from 'components/common/location-map';


describe('LocationMap component', function () {
  it('should render location map with default marker', function () {
    const wrapper = mount(<LocationMap lng={ 0 } lat={ 0 } />);
    wrapper.find('.test--location-map').exists().should.be.true();
    wrapper.instance().marker.element.className.should.equal('default-marker');
  });

  it('should reset marker location on rerender', function () {
    const wrapper = mount(<LocationMap lng={ 0 } lat={ 0 } />);
    let instance = wrapper.instance();
    instance.marker.setLngLat.resetHistory();

    wrapper.setProps({ lng: 1, lat: 1 });
    instance.marker.setLngLat.should.be.calledWith([1, 1]);
  });

  it('should zoom out on rerender if it\'s zoom in already', function () {
    const wrapper = mount(<LocationMap lng={ 0 } lat={ 0 } />);
    const instance = wrapper.instance();
    instance.handleMapClick();
    const zoomOutSpy = sinon.spy(instance, 'zoomOut');
    instance.map.getZoom.returns(13);

    wrapper.setProps({ lng: 1, lat: 1 });
    zoomOutSpy.should.be.called();
    instance.map.getZoom.resetHistory();
  });

  it('should call zoomIn when click and map is zoomed out', function () {
    const wrapper = mount(<LocationMap lng={ 1 } lat={ 1 } />);
    const instance = wrapper.instance();
    const zoomIn = sinon.spy(instance, 'zoomIn');
    instance.map.getZoom.returns(9);
    instance.handleMapClick();
    zoomIn.should.be.called();
    instance.map.getZoom.resetHistory();
  });

  it('should call zoomOut when click and map is zoomed in', function () {
    const wrapper = mount(<LocationMap lng={ 1 } lat={ 1 } />);
    const instance = wrapper.instance();
    const zoomOut = sinon.spy(instance, 'zoomOut');
    instance.map.getZoom.returns(13);
    instance.handleMapClick();
    zoomOut.should.be.called();
    instance.map.getZoom.resetHistory();
  });

  it('should render with custom marker', function () {
    const wrapper = mount(<LocationMap lng={ 0 } lat={ 0 } customMarkerClassName='custom-marker' />);

    wrapper.instance().marker.element.className.should.equal('custom-marker');
  });
});
