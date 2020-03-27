import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import PinboardButton from 'components/headers/slim-header/slim-header-content/pinboard-button';
import * as pinboardUtils from 'utils/pinboard';
import browserHistory from 'utils/history';
import { PINBOARD_INTRODUCTION } from 'utils/constants';


describe('PinboardButton component', function () {
  let wrapper;
  context('isPinboardButtonIntroductionVisited() return true', function () {
    beforeEach(function () {
      localStorage.setItem(PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION, '1');
      wrapper = mount(<PinboardButton />);
    });

    it('should render header-link without show-introduction class', function () {
      const headerLink = wrapper.find('.header-link');
      headerLink.exists().should.be.true();
      headerLink.prop('className').should.not.containEql('show-introduction');
    });

    it('should not render pinboard button introduction', function () {
      wrapper.find('.pinboard-button-introduction').exists().should.be.false();
    });
  });

  context('isPinboardButtonIntroductionVisited() return false', function () {
    let setPinboardButtonIntroductionVisitedSpy;
    let browserHistoryPushSpy;
    beforeEach(function () {
      localStorage.removeItem(PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION);
      setPinboardButtonIntroductionVisitedSpy = spy(pinboardUtils, 'setPinboardButtonIntroductionVisited');
      browserHistoryPushSpy = spy(browserHistory, 'push');
      wrapper = mount(<PinboardButton />);
    });

    it('should render header-link with show-introduction class', function () {
      wrapper.find('.header-link').exists().should.be.true();
      wrapper.setState({ displayIntroduction: true });
      wrapper.find('.header-link').prop('className').should.containEql('show-introduction');
    });

    it('should render pinboard button introduction', function () {
      wrapper.find('.pinboard-button-introduction').exists().should.be.true();
    });

    it('should call setPinboardButtonIntroductionVisited and redirect to pinboard on user click', function () {
      wrapper.find('.header-link').simulate('click');
      setPinboardButtonIntroductionVisitedSpy.should.be.calledOnce();
      browserHistoryPushSpy.should.be.calledWith('/pinboard/');
    });

    it('should call setPinboardButtonIntroductionVisited and redirect to pinboard on user click Try it', function () {
      wrapper.find('.try-it-btn').simulate('click');
      setPinboardButtonIntroductionVisitedSpy.should.be.calledOnce();
      browserHistoryPushSpy.should.be.calledWith('/pinboard/');
    });

    it('should call setPinboardButtonIntroductionVisited and forceUpdate on user click Dismiss', function () {
      wrapper.find('.dismiss-btn').simulate('click');
      setPinboardButtonIntroductionVisitedSpy.should.be.calledOnce();
      wrapper.find('.pinboard-button-introduction').exists().should.be.false();
    });
  });
});
