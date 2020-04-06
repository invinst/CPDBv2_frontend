import React from 'react';
import { mount } from 'enzyme';
import { spy, useFakeTimers } from 'sinon';

import PinboardButton from 'components/headers/slim-header/slim-header-content/pinboard-button';
import * as pinboardUtils from 'utils/pinboard';
import browserHistory from 'utils/history';
import { PINBOARD_INTRODUCTION, PINBOARD_INTRODUCTION_DELAY } from 'utils/constants';


describe('PinboardButton component', function () {
  let wrapper;
  describe('componentDidMount', function () {
    it('should set displayIntroduction to true after delay', function () {
      const clock = useFakeTimers();
      wrapper = mount(<PinboardButton />);
      wrapper.state('displayIntroduction').should.be.false();
      clock.tick(PINBOARD_INTRODUCTION_DELAY + 100);
      wrapper.state('displayIntroduction').should.be.true();
    });
  });

  describe('componentWillUnmount', function () {
    it('should clear displayIntroductionTimeout', function () {
      const clearTimeoutSpy = spy(window, 'clearTimeout');
      wrapper = mount(<PinboardButton />);
      const displayIntroductionTimeout = wrapper.instance().displayIntroductionTimeout;
      wrapper.unmount();
      clearTimeoutSpy.should.be.calledWith(displayIntroductionTimeout);
    });
  });

  context('isPinboardButtonIntroductionVisited() return true', function () {
    beforeEach(function () {
      localStorage.setItem(PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION, '1');
      wrapper = mount(<PinboardButton />);
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
      wrapper = mount(<PinboardButton />);
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
