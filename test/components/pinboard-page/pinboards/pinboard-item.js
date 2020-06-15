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
    lastViewedAt: '13/12/2019 at 12:12 AM',
    url: '/pinboard/1/pinboard-title/',
    isCurrent: false,
  };

  const store = MockStore()({
    pinboardPage: {
      pinboard: {
        id: '1',
        saving: false,
      },
    },
  });

  it('should render correctly', function () {
    const wrapper = shallow(
      <PinboardItem pinboard={ pinboard } />
    );

    wrapper.find('.pinboard-title').text().should.equal('Pinboard Title');
    wrapper.find('.pinboard-viewed-at').text().should.equal('Viewed 13/12/2019 at 12:12 AM');
  });

  context('shouldShowActions is true', function () {
    let wrapper;
    let handleSetShowActionsPinboardId;
    let duplicatePinboard;
    let removePinboard;
    let handleCloseSpy;

    beforeEach(function () {
      handleSetShowActionsPinboardId = spy();
      removePinboard = spy();
      handleCloseSpy = spy();
      duplicatePinboard = stub().usingPromise(Promise).resolves({
        payload: {
          id: '5cd06f2b',
          title: 'Pinboard title',
        },
      });
      wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <PinboardItem
              pinboard={ pinboard }
              duplicatePinboard={ duplicatePinboard }
              removePinboard={ removePinboard }
              handleSetShowActionsPinboardId={ handleSetShowActionsPinboardId }
              shouldShowActions={ true }
              handleClose={ handleCloseSpy }
            />
          </MemoryRouter>
        </Provider>
      );
    });

    it('should render actions button and call handleSetShowActionsPinboardId with null on click', function () {
      const pinboardItemActionsBtn = wrapper.find('.pinboard-item-actions-btn').first();
      pinboardItemActionsBtn.prop('className').should.containEql('focused');
      pinboardItemActionsBtn.simulate('click');
      handleSetShowActionsPinboardId.should.be.calledOnce();
      handleSetShowActionsPinboardId.should.be.calledWith(null);
    });

    it('should display actions', function () {
      wrapper.find('.duplicate-pinboard-btn').exists().should.be.true();
      wrapper.find('.remove-pinboard-btn').exists().should.be.true();
    });

    it('should close actions pane, pinboards list and redirect on click on duplicate', function (done) {
      const duplicateButton = wrapper.find('.duplicate-pinboard-btn').first();
      duplicateButton.simulate('click');
      duplicatePinboard.should.be.calledOnce();
      handleSetShowActionsPinboardId.should.be.calledOnce();
      handleSetShowActionsPinboardId.should.be.calledWith(null);
      setTimeout(() => {
        handleCloseSpy.should.be.calledOnce();
        browserHistory.location.pathname.should.equal('/pinboard/5cd06f2b/pinboard-title/');
        done();
      }, 50);
    });

    describe('remove pinboard item', function () {
      context('pinboard item is current pinboard', function () {
        it('should call removePinboard on click on remove', function () {
          const wrapper = mount(
            <Provider store={ store }>
              <MemoryRouter>
                <PinboardItem
                  pinboard={ { ...pinboard, isCurrent: true } }
                  duplicatePinboard={ duplicatePinboard }
                  removePinboard={ removePinboard }
                  handleSetShowActionsPinboardId={ handleSetShowActionsPinboardId }
                  shouldShowActions={ true }
                  handleClose={ handleCloseSpy }
                />
              </MemoryRouter>
            </Provider>
          );
          const removePinboardButton = wrapper.find('.remove-pinboard-btn').first();
          removePinboardButton.simulate('click');
          removePinboard.should.be.calledOnce();
          removePinboard.should.be.calledWith('1');
          handleCloseSpy.should.be.calledOnce();
        });
      });

      context('pinboard item is not current pinboard', function () {
        it('should call removePinboard and handleClose on click on remove', function () {
          const removePinboardButton = wrapper.find('.remove-pinboard-btn').first();
          removePinboardButton.simulate('click');
          removePinboard.should.be.calledOnce();
          removePinboard.should.be.calledWith('1');
          handleCloseSpy.should.not.be.called();
        });
      });
    });
  });

  context('shouldShowActions is false', function () {
    let wrapper;
    let handleSetShowActionsPinboardId;
    let duplicatePinboard;
    let removePinboard;

    beforeEach(function () {
      handleSetShowActionsPinboardId = spy();
      removePinboard = spy();
      duplicatePinboard = stub().usingPromise(Promise).resolves({
        payload: {
          id: '5cd06f2b',
          title: 'Pinboard title',
        },
      });
      wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <PinboardItem
              pinboard={ pinboard }
              duplicatePinboard={ duplicatePinboard }
              removePinboard={ removePinboard }
              handleSetShowActionsPinboardId={ handleSetShowActionsPinboardId }
              shouldShowActions={ false }
            />
          </MemoryRouter>
        </Provider>
      );
    });

    context('click on actions button', function () {
      it('should call handleSetShowActionsPinboard with correct pinboard id', function () {
        const pinboardItemActionsBtn = wrapper.find('.pinboard-item-actions-btn').first();
        pinboardItemActionsBtn.prop('className').should.not.containEql('focused');
        pinboardItemActionsBtn.simulate('click');
        handleSetShowActionsPinboardId.should.be.calledOnce();
        handleSetShowActionsPinboardId.should.be.calledWith('1');
      });
    });

    it('should not display actions', function () {
      wrapper.find('.duplicate-pinboard-btn').exists().should.be.false();
      wrapper.find('.remove-pinboard-btn').exists().should.be.false();
    });
  });

  context('isCurrent is true', function () {
    let wrapper;
    beforeEach(function () {
      wrapper = shallow(
        <PinboardItem pinboard={ { ...pinboard, isCurrent: true } } />,
      );
    });

    it('should render is-current class', function () {
      wrapper.find('.is-current').exists().should.be.true();
    });

    context('click on item', function () {
      it('should do nothing', function () {
        const browserHistoryPush = stub(browserHistory, 'push');
        wrapper.find('.pinboard-info').simulate('click');
        browserHistoryPush.should.not.be.called();
      });
    });
  });

  context('isCurrent is false', function () {
    let wrapper;
    beforeEach(function () {
      wrapper = shallow(
        <PinboardItem pinboard={ pinboard } />,
      );
    });

    it('should not render is-current class', function () {
      wrapper.find('.is-current').exists().should.be.false();
    });

    context('click on item', function () {
      it('should close preview pane and navigate', function () {
        const browserHistoryPush = stub(browserHistory, 'push');
        wrapper.find('.pinboard-info').simulate('click');
        browserHistoryPush.should.be.calledOnce();
        browserHistoryPush.should.be.calledWith('/pinboard/1/pinboard-title/');
      });
    });
  });
});
