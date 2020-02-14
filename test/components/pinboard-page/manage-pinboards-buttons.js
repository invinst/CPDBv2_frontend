import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { spy, stub } from 'sinon';
import { Promise } from 'es6-promise';
import browserHistory from 'utils/history';

import ManagePinboardsButtons from 'components/pinboard-page/manage-pinboards-buttons';


describe('ManagePinboardsButtons component', function () {
  const store = MockStore()({
    pinboardPage: {
      pinboard: {
        saving: false,
      },
    },
  });

  it('should render show pinboards list button', function () {
    const showPinboardsListSpy = spy();

    const wrapper = mount(
      <Provider store={ store }>
        <ManagePinboardsButtons showPinboardsList={ showPinboardsListSpy } />
      </Provider>
    );

    const showPinboardsListButton = wrapper.find('.pinboards-list-btn');
    showPinboardsListButton.simulate('click');

    showPinboardsListSpy.should.be.called();
  });

  it('should render new pinboard button', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <ManagePinboardsButtons />
      </Provider>
    );

    wrapper.find('.new-pinboard-menu').exists().should.be.false();
    const newPinboardButton = wrapper.find('.new-pinboard-menu-btn');

    newPinboardButton.simulate('click');
    wrapper.find('.new-pinboard-menu').exists().should.be.true();

    newPinboardButton.simulate('click');
    wrapper.find('.new-pinboard-menu').exists().should.be.false();
  });

  it('should render new-pinboard-link', function (done) {
    const createNewEmptyPinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });

    const wrapper = mount(
      <Provider store={ store }>
        <ManagePinboardsButtons createNewEmptyPinboard={ createNewEmptyPinboardStub }/>
      </Provider>
    );

    const newPinboardButton = wrapper.find('.new-pinboard-menu-btn');
    newPinboardButton.simulate('click');
    const newPinboardLink = wrapper.find('.new-pinboard-link').first();
    newPinboardLink.simulate('click');
    createNewEmptyPinboardStub.should.be.called();

    setTimeout(() => {
      browserHistory.location.pathname.should.equal('/pinboard/5cd06f2b/pinboard-title/');
      done();
    }, 50);
  });

  it('should render duplicate-current-pinboard-link', function (done) {
    const duplicatePinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });

    const wrapper = mount(
      <Provider store={ store }>
        <ManagePinboardsButtons pinboardId='66ef1560' duplicatePinboard={ duplicatePinboardStub }/>
      </Provider>
    );

    const newPinboardButton = wrapper.find('.new-pinboard-menu-btn');
    newPinboardButton.simulate('click');
    const newPinboardLink = wrapper.find('.duplicate-current-pinboard-link').first();
    newPinboardLink.simulate('click');
    duplicatePinboardStub.should.be.calledWith('66ef1560');
    setTimeout(() => {
      browserHistory.location.pathname.should.equal('/pinboard/5cd06f2b/pinboard-title/');
      done();
    }, 50);
  });
});
