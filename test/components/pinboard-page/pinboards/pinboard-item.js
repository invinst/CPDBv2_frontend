import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Promise } from 'es6-promise';
import { spy, stub } from 'sinon';

import browserHistory from 'utils/history';
import PinboardItem from 'components/pinboard-page/pinboards/pinboard-item';


describe('PinboardItem component', function () {
  const pinboard = {
    id: '1',
    title: 'Pinboard Title',
    createdAt: 'Sep 12, 2019',
    url: '/pinboard/1/pinboard-title/',
    isCurrent: false,
  };

  it('should render correctly', function () {
    const wrapper = shallow(
      <PinboardItem pinboard={ pinboard } />
    );

    wrapper.find('.pinboard-title').text().should.equal('Pinboard Title');
    wrapper.find('.pinboard-created-at').text().should.equal('Created Sep 12, 2019');
  });

  it('should render duplicate-pinboard-btn', function (done) {
    const duplicatePinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });
    const handleCloseSpy = spy();
    const store = MockStore()({
      pinboardPage: {
        pinboard: {
          saving: false,
        },
      },
    });

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <PinboardItem
            isShown={ true }
            pinboard={ pinboard }
            duplicatePinboard={ duplicatePinboardStub }
            handleClose={ handleCloseSpy }
          />
        </MemoryRouter>
      </Provider>
    );

    const duplicatePinboardBtn = wrapper.find('.duplicate-pinboard-btn').first();
    duplicatePinboardBtn.simulate('click');
    duplicatePinboardStub.should.be.called();

    setTimeout(() => {
      handleCloseSpy.should.be.called();
      browserHistory.location.pathname.should.equal('/pinboard/5cd06f2b/pinboard-title/');
      done();
    }, 50);
  });

  context('click on current pinboard', function () {
    it('should close preview pane and not navigate', function () {
      const browserHistoryPush = stub(browserHistory, 'push');
      const handleCloseSpy = spy();
      const wrapper = shallow(
        <PinboardItem
          pinboard={ { ...pinboard, isCurrent: true } }
          handleClose={ handleCloseSpy }
        />,
      );

      wrapper.simulate('click');
      handleCloseSpy.should.be.called();
      browserHistoryPush.should.not.be.called();
    });
  });

  context('click on different pinboard', function () {
    it('should close preview pane and navigate', function () {
      const browserHistoryPush = stub(browserHistory, 'push');
      const handleCloseSpy = spy();
      const wrapper = shallow(
        <PinboardItem
          pinboard={ pinboard }
          handleClose={ handleCloseSpy }
        />,
      );

      wrapper.simulate('click');
      handleCloseSpy.should.be.called();

      browserHistoryPush.should.be.calledOnce();
      browserHistoryPush.should.be.calledWith('/pinboard/1/pinboard-title/');
    });
  });
});
