import React from 'react';
import { mount } from 'enzyme';
import { spy, stub, useFakeTimers, match } from 'sinon';

import PinboardButton from 'components/headers/slim-header/slim-header-content/pinboard-button';
import browserHistory from 'utils/history';
import { APP_CONFIG_KEYS } from 'utils/constants';
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
      this.setDisplayIntroductionTimeoutSpy = spy(PinboardButton.prototype, 'setDisplayIntroductionTimeout');
    });

    context('heatMapDataRequested is true', function () {
      it('should set displayIntroduction to true after delay', function () {
        const clock = useFakeTimers();
        wrapper = mount(<PinboardButton heatMapDataRequested={ true }/>);
        this.setDisplayIntroductionTimeoutSpy.called.should.be.true();
        wrapper.state('displayIntroduction').should.be.false();
        clock.tick(PINBOARD_INTRODUCTION_DELAY + 100);
        wrapper.state('displayIntroduction').should.be.true();
      });
    });

    context('heatMapDataRequested is false', function () {
      it('should not call setDisplayIntroductionTimeout', function () {
        wrapper = mount(<PinboardButton heatMapDataRequested={ false }/>);
        this.setDisplayIntroductionTimeoutSpy.called.should.be.false();
      });
    });
  });

  describe('componentDidUpdate', function () {
    beforeEach(function () {
      this.setDisplayIntroductionTimeoutSpy = spy(PinboardButton.prototype, 'setDisplayIntroductionTimeout');
    });

    context('heatMapDataRequested is changed from false to true', function () {
      context('isPinboardButtonIntroductionVisited is false', function () {
        it('should set displayIntroduction to true after delay', function () {
          const clock = useFakeTimers();
          wrapper = mount(
            <PinboardButton
              heatMapDataRequested={ false }
              isPinboardButtonIntroductionVisited={ false }
            />
          );
          this.setDisplayIntroductionTimeoutSpy.called.should.be.false();

          wrapper.setProps({
            heatMapDataRequested: true,
          });
          this.setDisplayIntroductionTimeoutSpy.called.should.be.true();

          wrapper.state('displayIntroduction').should.be.false();
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 100);
          wrapper.state('displayIntroduction').should.be.true();
        });
      });

      context('isPinboardButtonIntroductionVisited is true', function () {
        it('should set displayIntroduction to true after delay', function () {
          wrapper = mount(
            <PinboardButton
              heatMapDataRequested={ false }
              isPinboardButtonIntroductionVisited={ true }
            />
          );
          this.setDisplayIntroductionTimeoutSpy.called.should.be.false();

          wrapper.setProps({
            heatMapDataRequested: true,
          });
          this.setDisplayIntroductionTimeoutSpy.called.should.be.false();
        });
      });
    });

    context('heatMapDataRequested is not changed from false to true', function () {
      context('isPinboardButtonIntroductionVisited is false', function () {
        it('should not call setDisplayIntroductionTimeout', function () {
          wrapper = mount(
            <PinboardButton
              heatMapDataRequested={ false }
              isPinboardButtonIntroductionVisited={ false }
            />
          );
          this.setDisplayIntroductionTimeoutSpy.called.should.be.false();

          wrapper.setProps({
            heatMapDataRequested: false,
          });
          this.setDisplayIntroductionTimeoutSpy.called.should.be.false();
        });
      });

      context('isPinboardButtonIntroductionVisited is true', function () {
        it('should not call setDisplayIntroductionTimeout', function () {
          wrapper = mount(
            <PinboardButton
              heatMapDataRequested={ false }
              isPinboardButtonIntroductionVisited={ true }
            />
          );
          this.setDisplayIntroductionTimeoutSpy.called.should.be.false();

          wrapper.setProps({
            heatMapDataRequested: false,
          });
          this.setDisplayIntroductionTimeoutSpy.called.should.be.false();
        });
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

  describe('setDisplayIntroductionTimeout', function () {
    it('should get timeout value from appConfig', function () {
      const appConfigGetStub = stub(appConfig.default, 'get').returns(113);
      const setTimeoutSpy = spy(window, 'setTimeout');
      const setDisplayIntroductionTimeoutSpy = spy(PinboardButton.prototype, 'setDisplayIntroductionTimeout');
      mount(<PinboardButton heatMapDataRequested={ true }/>);

      setDisplayIntroductionTimeoutSpy.should.be.calledOnce();
      appConfigGetStub.should.be.calledOnce();
      appConfigGetStub.should.be.calledWith(APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY);
      setTimeoutSpy.should.be.calledOnce();
      setTimeoutSpy.should.be.calledWith(match.any, 113);
    });
  });

  context('heatMapDataRequested is true', function () {
    context('isPinboardButtonIntroductionVisited is true', function () {
      beforeEach(function () {
        wrapper = mount(<PinboardButton heatMapDataRequested={ true } isPinboardButtonIntroductionVisited={ true } />);
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

    context('isPinboardButtonIntroductionVisited is false', function () {
      let visitPinboardButtonIntroductionSpy;
      let browserHistoryPushSpy;
      let clock;
      beforeEach(function () {
        clock = useFakeTimers();
        visitPinboardButtonIntroductionSpy = spy();
        browserHistoryPushSpy = spy(browserHistory, 'push');
        wrapper = mount(
          <PinboardButton
            heatMapDataRequested={ true }
            isPinboardButtonIntroductionVisited={ false }
            visitPinboardButtonIntroduction={ visitPinboardButtonIntroductionSpy }
          />
        );
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

      it('should call visitPinboardButtonIntroduction and redirect to pinboard on user click', function () {
        wrapper.find('.header-link').simulate('click');
        visitPinboardButtonIntroductionSpy.should.be.calledOnce();
        browserHistoryPushSpy.should.be.calledWith('/pinboard/');
      });

      it('should call visitPinboardButtonIntroduction and redirect to pinboard on user click Try it', function () {
        clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
        wrapper.update();
        wrapper.find('.try-it-btn').simulate('click');
        visitPinboardButtonIntroductionSpy.should.be.calledOnce();
        browserHistoryPushSpy.should.be.calledWith('/pinboard/');
      });

      it('should call visitPinboardButtonIntroduction on user click close button', function () {
        clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
        wrapper.update();
        wrapper.find('.pinboard-button-introduction-close-btn').simulate('click');
        visitPinboardButtonIntroductionSpy.should.be.calledOnce();
      });
    });
  });
});
