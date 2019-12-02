import React from 'react';
import { mount } from 'enzyme';
import { browserHistory, Router, Route, createMemoryHistory } from 'react-router';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Promise } from 'es6-promise';
import { spy, stub } from 'sinon';

import Pinboards from 'components/pinboard-page/pinboards';


describe('Pinboards component', function () {
  const store = MockStore()({
    pinboardPage: {
      pinboard: {
        saving: false,
      },
    },
  });

  const pinboards = [
    {
      id: '1',
      title: 'Pinboard Title',
      createdAt: 'Sep 12, 2019',
      url: '/pinboard/1/pinboard-title/',
    },
    {
      id: '2',
      title: '',
      createdAt: 'Oct 15, 2019',
      url: '/pinboard/2/untitled-pinboard/',
    },
  ];

  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
  });

  afterEach(function () {
    this.browserHistoryPush.restore();
  });

  it('should render pinboard items', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <Pinboards pinboards={ pinboards } isShown={ true } />
      </Provider>
    );

    wrapper.find('.pinboards-title').text().should.equal('Pinboards');

    const pinboardItems = wrapper.find('.pinboard-item');
    pinboardItems.should.have.length(2);

    const pinboardTitles = wrapper.find('.pinboard-title');
    const pinboardCreatedAts = wrapper.find('.pinboard-created-at');

    pinboardTitles.at(0).text().should.equal('Pinboard Title');
    pinboardCreatedAts.at(0).text().should.equal('Created Sep 12, 2019');

    pinboardTitles.at(1).text().should.equal('');
    pinboardCreatedAts.at(1).text().should.equal('Created Oct 15, 2019');
  });

  it('should not render pinboard list if isShown is false', function () {
    const wrapper = mount(
      <Pinboards pinboards={ pinboards } isShown={ false } />
    );

    wrapper.find('.pinboards-title').exists().should.be.false();
    wrapper.find('.pinboard-item').exists().should.be.false();
  });

  describe('componentWillReceiveProps', function () {
    it('should fetchPinboards if isShow change from false to true', function () {
      const fetchPinboardsSpy = spy();

      const wrapper = mount(
        <Provider store={ store }>
          <Pinboards pinboards={ pinboards } isShown={ false } fetchPinboards={ fetchPinboardsSpy }/>
        </Provider>
      );

      fetchPinboardsSpy.should.not.be.called();

      wrapper.setProps({
        children: <Pinboards pinboards={ pinboards } isShown={ true } fetchPinboards={ fetchPinboardsSpy }/>
      });

      fetchPinboardsSpy.should.be.called();
    });
  });

  it('should render new-pinboard-btn', function (done) {
    const createNewEmptyPinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });
    const handleCloseSpy = spy();

    const pinboardsList = () => (
      <Provider store={ store }>
        <Pinboards
          isShown={ true }
          pinboards={ pinboards }
          createNewEmptyPinboard={ createNewEmptyPinboardStub }
          handleClose={ handleCloseSpy }
        />
      </Provider>
    );

    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardsList } />
      </Router>
    );

    const newPinboardLink = wrapper.find('.new-pinboard-btn');
    newPinboardLink.simulate('click');
    createNewEmptyPinboardStub.should.be.called();

    setTimeout(() => {
      handleCloseSpy.should.be.called();
      this.browserHistoryPush.should.be.calledWith('/pinboard/5cd06f2b/pinboard-title/');
      done();
    }, 50);
  });
});
