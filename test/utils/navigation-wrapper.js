import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import NavigationWrapper from 'utils/navigation-wrapper';
import browserHistory from 'utils/history';


describe('NavigationWrapper component', function () {
  describe('to is available', function () {
    it('should push history when user click', function () {
      const pushHistorySpy = sinon.spy(browserHistory, 'push');
      const wrapper = mount(
        <NavigationWrapper to={ 'url_1' }/>
      );
      wrapper.childAt(0).simulate('click');
      pushHistorySpy.should.be.calledWith('url_1');
    });
  });

  describe('to is empty', function () {
    it('should not push history when user click', function () {
      const pushHistorySpy = sinon.spy(browserHistory, 'push');
      const wrapper = mount(
        <NavigationWrapper/>
      );
      wrapper.childAt(0).simulate('click');
      pushHistorySpy.should.not.be.called();
    });
  });
});
