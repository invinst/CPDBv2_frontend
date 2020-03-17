import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import should from 'should';

import PinboardIntroduction from 'components/search-page/pinboard/pinboard-introduction';
import * as pinboardUtils from 'utils/pinboard';
import browserHistory from 'utils/history';
import styles from 'components/search-page/pinboard/pinboard-introduction.sass';
import { PINBOARD_INTRODUCTION } from 'utils/constants';


describe('PinboardIntroduction component', function () {
  let wrapper;
  context('isPinboardIntroductionVisited() return false', function () {
    let setPinboardIntroductionVisitedSpy;
    let browserHistoryPushSpy;
    beforeEach(function () {
      localStorage.removeItem(PINBOARD_INTRODUCTION.PINBOARD_INTRODUCTION);
      wrapper = mount(<PinboardIntroduction />);
      setPinboardIntroductionVisitedSpy = spy(pinboardUtils, 'setPinboardIntroductionVisited');
      browserHistoryPushSpy = spy(browserHistory, 'push');
    });

    it('should render pinboard introduction', function () {
      wrapper.find(`.${styles.pinboardIntroduction}`).exists().should.be.true();
    });

    it('should call setPinboardIntroductionVisited and forceUpdate on close button clicked', function () {
      wrapper.find('.introduction-close-btn').simulate('click');
      setPinboardIntroductionVisitedSpy.should.be.calledOnce();
      should(wrapper.html()).be.null();
    });

    it('should call setPinboardIntroductionVisited and redirect to /pinboard/ on Get Started clicked', function () {
      wrapper.find('.get-started-btn').simulate('click');
      setPinboardIntroductionVisitedSpy.should.be.calledOnce();
      browserHistoryPushSpy.should.be.calledWith('/pinboard/');
    });
  });

  context('isPinboardIntroductionVisited() return true', function () {
    it('should render nothing', function () {
      localStorage.setItem(PINBOARD_INTRODUCTION.PINBOARD_INTRODUCTION, '1');
      const wrapper = mount(<PinboardIntroduction />);
      should(wrapper.html()).be.null();
    });
  });
});
