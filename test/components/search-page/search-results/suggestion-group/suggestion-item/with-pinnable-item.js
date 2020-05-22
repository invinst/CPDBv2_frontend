import React from 'react';
import { shallow, mount } from 'enzyme';
import { noop } from 'lodash';
import Mousestrap from 'mousetrap';
import { spy, stub, match, useFakeTimers } from 'sinon';

import { mountWithRouter } from 'utils/test';
import JumpyMotion from 'components/animation/jumpy-motion';
import withPinnableItem
  from 'components/search-page/search-results/suggestion-group/suggestion-item/with-pinnable-item';
import TextWithInlineSearchAlias
  from 'components/search-page/search-results/suggestion-group/suggestion-item/text-with-inline-search-alias';
import EditModeItem from 'components/search-page/search-results/suggestion-group/suggestion-item/edit-mode-item';
import ItemPinButton from 'components/common/item-pin-button';
import * as appConfig from 'utils/app-config';
import { APP_CONFIG_KEYS } from 'utils/constants';


const PINBOARD_INTRODUCTION_DELAY = 999;

describe('withPinnableItem component', function () {
  beforeEach(function () {
    appConfig.default.set({
      [APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]: PINBOARD_INTRODUCTION_DELAY,
    });
  });
  context('not pinnable', function () {
    const ComponentType = withPinnableItem(false);
    const props = {
      suggestion: {
        text: 'text',
        id: 'id',
        type: 'type',
        subText: 'subText',
        tags: ['tag'],
        to: '/',
        url: '/',
        uniqueKey: '',
      },
      isFocused: false,
      aliasEditModeOn: false,
      selectItem: noop,
    };

    it('should rerender if suggestion props change', function () {
      const wrapper = shallow(<ComponentType { ...props } />);

      const nextProps = {
        isFocused: props.isFocused,
        suggestion: {
          text: 'changed',
        },
      };

      wrapper.instance().shouldComponentUpdate(nextProps).should.be.true();
    });

    it('should rerender if focused change', function () {
      const wrapper = shallow(<ComponentType { ...props } />);

      wrapper.instance().shouldComponentUpdate({ isFocused: !props.isFocused }).should.be.true();
    });

    it('should render first row', function () {
      const wrapper = mountWithRouter(<ComponentType { ...props } />);

      wrapper.find('.test--first-row').exists().should.be.true();
      wrapper.find(TextWithInlineSearchAlias).exists().should.be.true();
    });

    it('should render second row', function () {
      const wrapper = shallow(<ComponentType { ...props } />);

      wrapper.find('.test--second-row').exists().should.be.true();
    });

    it('should render content with edit mode item', function () {
      const wrapper = shallow(<ComponentType { ...props } />);

      wrapper.find(EditModeItem).exists().should.be.true();
    });

    it('should render content inside jummy motion', function () {
      const wrapper = shallow(<ComponentType { ...props } />);

      wrapper.find(JumpyMotion).exists().should.be.true();
    });
  });

  context('pinnable', function () {
    const ComponentType = withPinnableItem(true);
    const props = {
      suggestion: {
        text: 'text',
        id: 'id',
        type: 'type',
        subText: 'subText',
        tags: ['tag'],
        to: '/',
        url: '/',
        uniqueKey: '',
        showIntroduction: true,
      },
      isFocused: false,
      aliasEditModeOn: false,
      selectItem: noop,
      hide: false,
      pinboardUrl: '/pinboard/12f453/untitled-title',
    };

    it('should render item pin button', function () {
      const clock = useFakeTimers();
      const wrapper = shallow(<ComponentType { ...props } />);
      let itemPinButton = wrapper.find(ItemPinButton);
      itemPinButton.exists().should.be.true();
      itemPinButton.prop('showIntroduction').should.be.false();
      itemPinButton.prop('pinboardUrl').should.equal(props.pinboardUrl);
      clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
      wrapper.update();
      itemPinButton = wrapper.find(ItemPinButton);
      itemPinButton.exists().should.be.true();
      itemPinButton.prop('showIntroduction').should.be.true();
    });

    describe('componentDidUpdate', function () {
      it('should call setDisplayIntroductionTimeout()', function () {
        stub(ComponentType.prototype, 'componentDidMount');
        const wrapper = shallow(<ComponentType { ...props } hide={ true } />);
        const setDisplayIntroductionTimeoutSpy = spy(wrapper.instance(), 'setDisplayIntroductionTimeout');
        wrapper.setProps({ hide: false });
        setDisplayIntroductionTimeoutSpy.should.be.calledOnce();
      });
    });

    describe('componentDidMount', function () {
      it('should call setDisplayIntroductionTimeout()', function () {
        const componentDidMountStub = stub(ComponentType.prototype, 'componentDidMount');
        const wrapper = shallow(<ComponentType { ...props } hide={ true } />);
        const setDisplayIntroductionTimeoutSpy = spy(wrapper.instance(), 'setDisplayIntroductionTimeout');
        componentDidMountStub.restore();
        wrapper.instance().componentDidMount();
        setDisplayIntroductionTimeoutSpy.should.be.calledOnce();
      });
    });

    describe('shouldComponentUpdate', function () {
      it('should return true if props are changed', function () {
        const wrapper = shallow(
          <ComponentType
            suggestion={ { type: 'type', attr: 'value' } }
            isFocused={ true }
            hide={ true }
            pinboardUrl={ 'url' }
          />
        );
        const instance = wrapper.instance();
        instance.shouldComponentUpdate({
          suggestion: { type: 'type', attr: 'new value' },
          isFocused: true,
          hide: true,
          pinboardUrl: 'url',
        },
        {
          displayIntroduction: false,
        }).should.be.true();

        instance.shouldComponentUpdate({
          suggestion: { type: 'type', attr: 'value' },
          isFocused: false,
          hide: true,
          pinboardUrl: 'url',
        },
        {
          displayIntroduction: false,
        }).should.be.true();

        instance.shouldComponentUpdate({
          suggestion: { type: 'type', attr: 'value' },
          isFocused: true,
          hide: false,
          pinboardUrl: 'url',
        },
        {
          displayIntroduction: false,
        }).should.be.true();

        instance.shouldComponentUpdate({
          suggestion: { type: 'type', attr: 'value' },
          isFocused: true,
          hide: true,
          pinboardUrl: 'new url',
        },
        {
          displayIntroduction: false,
        }).should.be.true();

        instance.shouldComponentUpdate({
          suggestion: { type: 'type', attr: 'value' },
          isFocused: true,
          hide: true,
          pinboardUrl: 'url',
        },
        {
          displayIntroduction: true,
        }).should.be.true();
      });
    });

    describe('setDisplayIntroductionTimeout', function () {
      context('showIntroduction is true', function () {
        context('search page hide is true', function () {
          it('should not call setTimeout', function () {
            const setTimeoutSpy = spy(window, 'setTimeout');
            shallow(
              <ComponentType
                { ...props }
                hide={ true }
                suggestion={ { ...props.suggestion, showIntroduction: true } }
              />
            );
            setTimeoutSpy.should.not.be.called();
          });
        });

        context('search page hide is false', function () {
          it('should get timeout value from appConfig', function () {
            const appConfigGetStub = stub(appConfig.default, 'get').returns(113);
            const setTimeoutSpy = spy(window, 'setTimeout');
            shallow(
              <ComponentType
                { ...props }
                hide={ false }
                suggestion={ { ...props.suggestion, showIntroduction: true } }
              />
            );
            appConfigGetStub.should.be.calledOnce();
            setTimeoutSpy.should.be.calledOnce();
            setTimeoutSpy.should.be.calledWith(match.func, 113);
          });

          context('search page hide set to true', function () {
            it('should set displayIntroduction to false when props change', function () {
              const timer = useFakeTimers();
              const wrapper = shallow(
                <ComponentType
                  { ...props }
                  hide={ false }
                  suggestion={ { ...props.suggestion, showIntroduction: true } }
                />
              );
              timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
              wrapper.state('displayIntroduction').should.be.true();

              wrapper.setProps({ hide: true });
              wrapper.update();
              wrapper.state('displayIntroduction').should.be.false();
            });
          });
        });
      });

      context('showIntroduction is false', function () {
        context('search page hide is true', function () {
          it('should not call setTimeout', function () {
            const setTimeoutSpy = spy(window, 'setTimeout');
            shallow(
              <ComponentType
                { ...props }
                hide={ true }
                suggestion={ { ...props.suggestion, showIntroduction: false } }
              />
            );
            setTimeoutSpy.should.not.be.called();
          });
        });

        context('search page hide is false', function () {
          it('should not call setTimeout', function () {
            const setTimeoutSpy = spy(window, 'setTimeout');
            shallow(
              <ComponentType
                { ...props }
                hide={ false }
                suggestion={ { ...props.suggestion, showIntroduction: false } }
              />
            );
            setTimeoutSpy.should.not.be.called();
          });
        });
      });
    });

    describe('handleClick', function () {
      context('introduction message is not displayed', function () {
        it('should call selectItem if not focused', function () {
          const suggestion = {
            uniqueKey: '123',
            type: 'type',
          };
          const selectItemSpy = spy();
          const wrapper = mount(
            <ComponentType
              suggestion={ suggestion }
              selectItem={ selectItemSpy }
              isFocused={ false }/>
          );
          const element = wrapper.find('.suggestion-item-123').first();
          element.simulate('click');
          selectItemSpy.should.be.called();
        });

        it('should trigger ENTER event if focused and has selectItem', function () {
          const suggestion = {
            uniqueKey: '123',
            type: 'type',
          };
          const triggerStub = stub(Mousestrap, 'trigger');
          const wrapper = mount(
            <ComponentType
              suggestion={ suggestion }
              isFocused={ true }
              selectItem={ () => {} }
            />
          );
          const element = wrapper.find('.suggestion-item-123').first();
          element.simulate('click');
          triggerStub.withArgs('enter').should.be.called();
        });

        it('should trigger clickItem there is clickItem', function () {
          const clickItemSpy = spy();
          const suggestion = {
            id: 1,
            type: 'OFFICER',
            name: 'Jerome Finnigan',
            badge: 'Badge #123456',
            uniqueKey: '123',
          };
          const wrapper = mount(
            <ComponentType
              suggestion={ suggestion }
              clickItem={ clickItemSpy }
              selectItem={ () => {} }
            />
          );
          const element = wrapper.find('.suggestion-item-123').first();
          element.simulate('click');

          clickItemSpy.should.be.calledWith(suggestion);
        });
      });

      context('introduction message is displayed', function () {
        it('should call visitPinButtonIntroduction', function () {
          const timer = useFakeTimers();
          const clickItemSpy = spy();
          const selectItemSpy = spy();
          const visitPinButtonIntroductionSpy = spy();
          const triggerStub = stub(Mousestrap, 'trigger');
          const wrapper = shallow(
            <ComponentType
              { ...props }
              hide={ false }
              clickItem={ clickItemSpy }
              selectItem={ selectItemSpy }
              visitPinButtonIntroduction={ visitPinButtonIntroductionSpy }
              suggestion={ { ...props.suggestion, uniqueKey: '123', showIntroduction: true } }
            />
          );
          timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.state('displayIntroduction').should.be.true();
          const element = wrapper.find('.suggestion-item-123').first();
          element.simulate('click', { preventDefault: spy() } );
          clickItemSpy.should.not.be.called();
          selectItemSpy.should.not.be.called();
          triggerStub.should.not.be.called();
          visitPinButtonIntroductionSpy.should.be.calledOnce();
        });
      });
    });

    describe('render', function () {
      context('showIntroduction is true', function () {
        it('should display pin button introduction after timeout', function () {
          const timer = useFakeTimers();
          const wrapper = shallow(
            <ComponentType
              { ...props }
              hide={ false }
              suggestion={ { ...props.suggestion, uniqueKey: '123', showIntroduction: true } }
            />
          );
          wrapper.find('.pin-button-introduction').exists().should.be.false();
          timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.find('.pin-button-introduction').exists().should.be.true();
        });
      });

      context('showIntroduction is false', function () {
        it('should not display pin button introduction', function () {
          const timer = useFakeTimers();
          const wrapper = shallow(
            <ComponentType
              { ...props }
              hide={ false }
              suggestion={ { ...props.suggestion, uniqueKey: '123', showIntroduction: false } }
            />
          );
          wrapper.find('.pin-button-introduction').exists().should.be.false();
          timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.find('.pin-button-introduction').exists().should.be.false();
        });
      });
    });
  });
});
