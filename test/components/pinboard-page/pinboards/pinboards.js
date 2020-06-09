import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Promise } from 'es6-promise';
import { spy, stub } from 'sinon';

import browserHistory from 'utils/history';
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

  it('should render pinboard items', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <Pinboards pinboards={ pinboards } isShown={ true } />
      </Provider>
    );

    wrapper.find('.pinboards-title').text().should.equal('Pinboards');

    const pinboardItems = wrapper.find('.pinboard-item').hostNodes();
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

  it('should render new-pinboard-btn', function (done) {
    const createNewEmptyPinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });
    const handleCloseSpy = spy();

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <Pinboards
            isShown={ true }
            pinboards={ pinboards }
            createNewEmptyPinboard={ createNewEmptyPinboardStub }
            handleClose={ handleCloseSpy }
          />
        </MemoryRouter>
      </Provider>
    );

    const newPinboardLink = wrapper.find('.new-pinboard-btn').first();
    newPinboardLink.simulate('click');
    createNewEmptyPinboardStub.should.be.called();

    setTimeout(() => {
      handleCloseSpy.should.be.called();
      browserHistory.location.pathname.should.equal('/pinboard/5cd06f2b/pinboard-title/');
      done();
    }, 50);
  });
});
