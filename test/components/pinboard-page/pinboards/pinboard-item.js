import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Promise } from 'es6-promise';
import { stub } from 'sinon';

import browserHistory from 'utils/history';
import PinboardItem from 'components/pinboard-page/pinboards/pinboard-item';


describe('PinboardItem component', function () {
  const pinboard = {
    id: '1',
    title: 'Pinboard Title',
    createdAt: 'Sep 12, 2019',
    url: '/pinboard/1/pinboard-title/',
    lastViewedAt: '10/12/2019 at 10:20 AM',
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

  describe('untitled pinboard', function () {
    it('should render correctly', function () {
      const wrapper = shallow(
        <PinboardItem pinboard={ { ...pinboard, title: '' } } />
      );

      wrapper.find('.pinboard-title').text().should.equal('Created Sep 12, 2019');
      wrapper.find('.pinboard-viewed-at').text().should.equal('Viewed 10/12/2019 at 10:20 AM');
    });
  });

  describe('pinboard with title', function () {
    it('should render correctly', function () {

    });
  });

  context('shouldShowActions is true', function () {
    let wrapper;
    let handleSetShowActionsPinboardId;
    let duplicatePinboard;
    let removePinboard;

    beforeEach(function () {
      handleSetShowActionsPinboardId = stub();
      removePinboard = stub();
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
            />
          </MemoryRouter>
        </Provider>
      );
    });

    it('should render actions button and call handleSetShowActionsPinboard with null', function () {
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

    it('should close actions pane and redirect on click on duplicate', function (done) {
      const duplicateButton = wrapper.find('.duplicate-pinboard-btn').first();
      duplicateButton.simulate('click');
      duplicatePinboard.should.be.calledOnce();
      setTimeout(() => {
        browserHistory.location.pathname.should.equal('/pinboard/5cd06f2b/pinboard-title/');
        done();
      }, 50);
      handleSetShowActionsPinboardId.should.be.calledOnce();
      handleSetShowActionsPinboardId.should.be.calledWith(null);
    });

    it('should call removePinboard on click on remove', function () {
      const removePinboardButton = wrapper.find('.remove-pinboard-btn').first();
      removePinboardButton.simulate('click');
      removePinboard.should.be.calledOnce();
      removePinboard.should.be.calledWith('1');
    });
  });

  context('shouldShowActions is false', function () {
    let wrapper;
    let handleSetShowActionsPinboardId;
    let duplicatePinboard;
    let removePinboard;

    beforeEach(function () {
      handleSetShowActionsPinboardId = stub();
      removePinboard = stub();
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

    context('has pinboard id and click on actions button', function () {
      it('should call handleSetShowActionsPinboard with correct pinboard id', function () {
        const pinboardItemActionsBtn = wrapper.find('.pinboard-item-actions-btn').first();
        stub(wrapper.find(PinboardItem).instance().actionsBtn, 'getBoundingClientRect').returns({ bottom: 169 });
        pinboardItemActionsBtn.prop('className').should.not.containEql('focused');
        pinboardItemActionsBtn.simulate('click');
        handleSetShowActionsPinboardId.should.be.calledOnce();
        handleSetShowActionsPinboardId.should.be.calledWith('1', 169);
      });
    });

    context('pinboard id is null and click on actions buttons', function () {
      it('should not call handleSetShowActionsPinboard', function () {
        const wrapper = mount(
          <Provider store={ store }>
            <MemoryRouter>
              <PinboardItem
                pinboard={ { ...pinboard, id: null } }
                duplicatePinboard={ duplicatePinboard }
                removePinboard={ removePinboard }
                handleSetShowActionsPinboardId={ handleSetShowActionsPinboardId }
                shouldShowActions={ false }
              />
            </MemoryRouter>
          </Provider>
        );
        const pinboardItemActionsBtn = wrapper.find('.pinboard-item-actions-btn').first();
        pinboardItemActionsBtn.exists().should.be.true();
        pinboardItemActionsBtn.simulate('click');
        handleSetShowActionsPinboardId.should.not.be.called();
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

  context('hasPendingChanges is true', function () {
    context('hasTitlePendingChange is true', function () {
      it('should render spinner with updating title and not render last viewed at', function () {
        const wrapper = mount(
          <Provider store={ store }>
            <MemoryRouter>
              <PinboardItem
                pinboard={ { ...pinboard, hasTitlePendingChange: true, hasPendingChanges: true } }
                shouldShowActions={ false }
              />
            </MemoryRouter>
          </Provider>
        );
        wrapper.find('.pinboard-title').text().should.equal('Updating pinboard title...');
        wrapper.find('.spinner').exists().should.be.true();
        wrapper.find('.pinboard-viewed-at').exists().should.be.false();
      });
    });

    context('hasTitlePendingChange is false', function () {
      it('should render spinner', function () {
        const wrapper = mount(
          <Provider store={ store }>
            <MemoryRouter>
              <PinboardItem
                pinboard={ { ...pinboard, hasTitlePendingChange: false, hasPendingChanges: true } }
                shouldShowActions={ false }
              />
            </MemoryRouter>
          </Provider>
        );
        wrapper.find('.pinboard-title').text().should.equal('Pinboard Title');
        wrapper.find('.spinner').exists().should.be.true();
        wrapper.find('.pinboard-viewed-at').exists().should.be.true();
        wrapper.find('.pinboard-viewed-at').text().should.equal('Viewed 10/12/2019 at 10:20 AM');
      });
    });
  });

  context('hasPendingChanges is false', function () {
    it('should not render spinner', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <PinboardItem
              pinboard={ { ...pinboard, hasTitlePendingChange: false, hasPendingChanges: false } }
              shouldShowActions={ false }
            />
          </MemoryRouter>
        </Provider>
      );
      wrapper.find('.pinboard-title').text().should.equal('Pinboard Title');
      wrapper.find('.spinner').exists().should.be.false();
      wrapper.find('.pinboard-viewed-at').exists().should.be.true();
      wrapper.find('.pinboard-viewed-at').text().should.equal('Viewed 10/12/2019 at 10:20 AM');
    });
  });
});
