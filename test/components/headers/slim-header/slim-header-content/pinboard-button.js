import React from 'react';
import { mount } from 'enzyme';
import { spy, stub, useFakeTimers, match } from 'sinon';

import PinboardButton from 'components/headers/slim-header/slim-header-content/pinboard-button';
import * as pinboardUtils from 'utils/pinboard';
import browserHistory from 'utils/history';
import { PINBOARD_INTRODUCTION, APP_CONFIG_KEYS } from 'utils/constants';
import * as appConfig from 'utils/app-config';


const PINBOARD_INTRODUCTION_DELAY = 2000;

describe('PinboardButton component', function () {
  let wrapper;
  beforeEach(function () {
    appConfig.default.set({
      [APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]: PINBOARD_INTRODUCTION_DELAY,
    });
  });

  describe('componentDidMount', function () {
    beforeEach(function () {
      this.setdisplayIntroductionTimeoutSpy = spy(PinboardButton.prototype, 'setdisplayIntroductionTimeout');
    });

    context('heatMapDataRequested is true', function () {
      it('should set displayIntroduction to true after delay', function () {
        const clock = useFakeTimers();
        wrapper = mount(<PinboardButton heatMapDataRequested={ true }/>);
        this.setdisplayIntroductionTimeoutSpy.called.should.be.true();
        wrapper.state('displayIntroduction').should.be.false();
        clock.tick(PINBOARD_INTRODUCTION_DELAY + 100);
        wrapper.state('displayIntroduction').should.be.true();
      });
    });

    context('heatMapDataRequested is false', function () {
      it('should not call setdisplayIntroductionTimeout', function () {
        wrapper = mount(<PinboardButton heatMapDataRequested={ false }/>);
        this.setdisplayIntroductionTimeoutSpy.called.should.be.false();
      });
    });
  });

  describe('componentDidUpdate', function () {
    beforeEach(function () {
      this.setdisplayIntroductionTimeoutSpy = spy(PinboardButton.prototype, 'setdisplayIntroductionTimeout');
    });

    context('heatMapDataRequested is changed from false to true', function () {
      it('should set displayIntroduction to true after delay', function () {
        const clock = useFakeTimers();
        wrapper = mount(<PinboardButton heatMapDataRequested={ false } />);
        this.setdisplayIntroductionTimeoutSpy.called.should.be.false();

        wrapper.setProps({
          heatMapDataRequested: true,
        });
        this.setdisplayIntroductionTimeoutSpy.called.should.be.true();

        wrapper.state('displayIntroduction').should.be.false();
        clock.tick(PINBOARD_INTRODUCTION_DELAY + 100);
        wrapper.state('displayIntroduction').should.be.true();
      });
    });

    context('heatMapDataRequested is not changed from false to true', function () {
      it('should not call setdisplayIntroductionTimeout', function () {
        wrapper = mount(<PinboardButton heatMapDataRequested={ false } />);
        this.setdisplayIntroductionTimeoutSpy.called.should.be.false();

        wrapper.setProps({
          heatMapDataRequested: false,
        });
        this.setdisplayIntroductionTimeoutSpy.called.should.be.false();
      });
    });
  });

  describe('componentWillUnmount', function () {
    it('should clear displayIntroductionTimeout', function () {
      const clearTimeoutSpy = spy(window, 'clearTimeout');
      wrapper = mount(<PinboardButton heatMapDataRequested={ true } />);
      const displayIntroductionTimeout = wrapper.instance().displayIntroductionTimeout;
      wrapper.unmount();
      clearTimeoutSpy.should.be.calledWith(displayIntroductionTimeout);
    });
  });

  describe('setdisplayIntroductionTimeout', function () {
    it('should get timeout value from appConfig', function () {
      const appConfigGetStub = stub(appConfig.default, 'get').returns(113);
      const setTimeoutSpy = spy(window, 'setTimeout');
      const setdisplayIntroductionTimeoutSpy = spy(PinboardButton.prototype, 'setdisplayIntroductionTimeout');
      mount(<PinboardButton heatMapDataRequested={ true }/>);

      setdisplayIntroductionTimeoutSpy.should.be.calledOnce();
      appConfigGetStub.should.be.calledOnce();
      appConfigGetStub.should.be.calledWith(APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY);
      setTimeoutSpy.should.be.calledOnce();
      setTimeoutSpy.should.be.calledWith(match.any, 113);
    });
  });

  context('heatMapDataRequested is true', function () {
    context('isPinboardButtonIntroductionVisited() return true', function () {
      beforeEach(function () {
        localStorage.setItem(PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION, '1');
        wrapper = mount(<PinboardButton heatMapDataRequested={ true } />);
      });

      it('should render header-link without show-introduction class', function () {
        const rightLink = wrapper.find('.header-link');
        rightLink.exists().should.be.true();
        rightLink.prop('className').should.not.containEql('show-introduction');
      });

      it('should not render pinboard button introduction', function () {
        wrapper.find('.pinboard-button-introduction').exists().should.be.false();
      });
    });

    context('isPinboardButtonIntroductionVisited() return false', function () {
      let setPinboardButtonIntroductionVisitedSpy;
      let browserHistoryPushSpy;
      let clock;
      beforeEach(function () {
        clock = useFakeTimers();
        localStorage.removeItem(PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION);
        setPinboardButtonIntroductionVisitedSpy = spy(pinboardUtils, 'setPinboardButtonIntroductionVisited');
        browserHistoryPushSpy = spy(browserHistory, 'push');
        wrapper = mount(<PinboardButton heatMapDataRequested={ true } />);
      });

      it('should render header-link with show-introduction class after timeout', function () {
        wrapper.find('.header-link').exists().should.be.true();
        wrapper.find('.header-link').prop('className').should.not.containEql('show-introduction');
        clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
        wrapper.update();
        wrapper.find('.header-link').prop('className').should.containEql('show-introduction');
      });

      it('should render pinboard button introduction after timeout', function () {
        wrapper.find('.pinboard-button-introduction').exists().should.be.false();
        clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
        wrapper.update();
        wrapper.find('.pinboard-button-introduction').exists().should.be.true();
      });

      it('should call setPinboardButtonIntroductionVisited and redirect to pinboard on user click', function () {
        wrapper.find('.header-link').simulate('click');
        setPinboardButtonIntroductionVisitedSpy.should.be.calledOnce();
        browserHistoryPushSpy.should.be.calledWith('/pinboard/');
      });

      it('should call setPinboardButtonIntroductionVisited and redirect to pinboard on user click Try it', function () {
        clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
        wrapper.update();
        wrapper.find('.try-it-btn').simulate('click');
        setPinboardButtonIntroductionVisitedSpy.should.be.calledOnce();
        browserHistoryPushSpy.should.be.calledWith('/pinboard/');
      });

      it('should call setPinboardButtonIntroductionVisited and forceUpdate on user click Dismiss', function () {
        clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
        wrapper.update();
        wrapper.find('.dismiss-btn').simulate('click');
        setPinboardButtonIntroductionVisitedSpy.should.be.calledOnce();
        wrapper.find('.pinboard-button-introduction').exists().should.be.false();
      });
    });
  });
});
