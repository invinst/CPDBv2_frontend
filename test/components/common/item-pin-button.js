import React from 'react';
import { mount } from 'enzyme';
import { stub, spy, useFakeTimers } from 'sinon';

import ItemPinButton from 'components/common/item-pin-button';
import { PINBOARD_INTRODUCTION, PINBOARD_INTRODUCTION_DELAY } from 'utils/constants';


describe('<ItemPinButton />', function () {
  it('should call addItemInPinboardPage action when clicked on', function () {
    const addOrRemoveItemInPinboard = stub();
    const wrapper = mount(
      <ItemPinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        item={ {
          isPinned: false,
          type: 'CR',
          id: '1',
        } }
      />
    );
    wrapper.simulate('click');
    addOrRemoveItemInPinboard.calledWith({
      type: 'CR',
      id: '1',
      isPinned: false,
    }).should.be.true();
  });

  describe('render', function () {
    it('should have class pinboard-feature', function () {
      const wrapper = mount(<ItemPinButton item={ { isPinned: true } } />);
      wrapper.find('ItemPinButton').childAt(0).hasClass('pinboard-feature').should.be.true();
    });

    it('should have class is-pinned if item.isPinned is true', function () {
      const wrapper = mount(<ItemPinButton item={ { isPinned: true } } />);
      wrapper.find('.is-pinned').exists().should.be.true();
    });

    it('should not have class is-pinned if item.isPinned is false', function () {
      const wrapper = mount(<ItemPinButton item={ { isPinned: false } } />);
      wrapper.find('.is-pinned').exists().should.be.false();
    });

    it('should render pin action hint if showHint is true', function () {
      const wrapper = mount(<ItemPinButton />);

      wrapper.find('.pin-action-hint').exists().should.be.true();
    });

    it('should not render pin action hint if showHint is false', function () {
      const wrapper = mount(<ItemPinButton showHint={ false }/>);

      wrapper.find('.pin-action-hint').exists().should.be.false();
    });

    context('isPinButtonIntroductionVisited() is true', function () {
      let clock;
      beforeEach(function () {
        localStorage.setItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION, '1');
        clock = useFakeTimers();
      });

      context('showIntroduction is false', function () {
        let wrapper;
        beforeEach(function () {
          wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ false } />);
        });

        it('should not have show-introduction class', function () {
          wrapper.find('.pinboard-feature').hasClass('show-introduction').should.be.false();
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.update();
          wrapper.find('.pinboard-feature').hasClass('show-introduction').should.be.false();
        });

        it('should not render introduction', function () {
          wrapper.find('.pin-button-introduction').exists().should.be.false();
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.update();
          wrapper.find('.pin-button-introduction').exists().should.be.false();
        });
      });

      context('showIntroduction is true', function () {
        let wrapper;
        beforeEach(function () {
          wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
        });

        it('should not have show-introduction class', function () {
          wrapper.find('.pinboard-feature').hasClass('show-introduction').should.be.false();
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.update();
          wrapper.find('.pinboard-feature').hasClass('show-introduction').should.be.false();
        });

        it('should not render introduction', function () {
          wrapper.find('.pin-button-introduction').exists().should.be.false();
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.update();
          wrapper.find('.pin-button-introduction').exists().should.be.false();
        });
      });
    });

    context('isPinButtonIntroductionVisited() is false', function () {
      let clock;
      beforeEach(function () {
        localStorage.removeItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION);
        clock = useFakeTimers();
      });

      context('showIntroduction is false', function () {
        let wrapper;
        beforeEach(function () {
          wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ false } />);
        });

        it('should not have show-introduction class', function () {
          wrapper.find('.pinboard-feature').hasClass('show-introduction').should.be.false();
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.update();
          wrapper.find('.pinboard-feature').hasClass('show-introduction').should.be.false();
        });

        it('should not render introduction', function () {
          wrapper.find('.pin-button-introduction').exists().should.be.false();
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.update();
          wrapper.find('.pin-button-introduction').exists().should.be.false();
        });
      });

      context('showIntroduction is true', function () {
        let wrapper;
        beforeEach(function () {
          wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
        });

        it('should have show-introduction class', function () {
          wrapper.find('.pinboard-feature').hasClass('show-introduction').should.be.false();
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.update();
          wrapper.find('.pinboard-feature').hasClass('show-introduction').should.be.true();
        });

        it('should render introduction after delay', function () {
          wrapper.find('.pin-button-introduction').exists().should.be.false();
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.update();
          wrapper.find('.pin-button-introduction').exists().should.be.true();
        });

        describe('handleClickOutside', function () {
          let handleClickOutside;
          beforeEach(function () {
            wrapper = mount(
              <div className='content-wrapper'>
                <ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />
                <div className='result-item'/>
              </div>
            );
            handleClickOutside = wrapper.find('ItemPinButton').instance().handleClickOutside;
          });

          it('should render introduction after click on introduction', function () {
            clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
            wrapper.update();
            wrapper.find('.pin-button-introduction').exists().should.be.true();

            handleClickOutside({ target: wrapper.find('.pin-button-introduction').getDOMNode() });

            clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
            wrapper.update();
            wrapper.find('.pin-button-introduction').exists().should.be.true();
          });

          it('should not render introduction after user click outside', function () {
            clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
            wrapper.update();
            wrapper.find('.pin-button-introduction').exists().should.be.true();

            handleClickOutside({ target: wrapper.find('.result-item').getDOMNode() });

            clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
            wrapper.update();
            wrapper.find('.pin-button-introduction').exists().should.be.false();
          });

          it('should remove event listener after user click outside', function () {
            const removeEventListenerSpy = spy(window, 'removeEventListener');
            clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
            wrapper.update();
            wrapper.find('.pin-button-introduction').exists().should.be.true();

            handleClickOutside({ target: wrapper.find('.result-item').getDOMNode() });
            removeEventListenerSpy.should.be.calledWith('mousedown', handleClickOutside);
          });
        });
      });
    });
  });

  describe('componentWillUnmount', function () {
    context('isPinButtonIntroductionVisited() is false', function () {
      beforeEach(function () {
        localStorage.removeItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION);
      });

      context('showIntroduction is true', function () {
        it('should remove click outside event listener', function () {
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
          const removeEventListenerSpy = spy(window, 'removeEventListener');
          const handleClickOutside = wrapper.find('ItemPinButton').instance().handleClickOutside;
          wrapper.unmount();
          removeEventListenerSpy.should.be.calledWith('mousedown', handleClickOutside);
        });

        it('should clear display timeout', function () {
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
          const clearTimeoutSpy = spy(window, 'clearTimeout');
          const displayIntroductionTimeout = wrapper.find('ItemPinButton').instance().displayIntroductionTimeout;
          wrapper.unmount();
          clearTimeoutSpy.should.be.calledWith(displayIntroductionTimeout);
        });

        it('should not clear display timeout after display', function () {
          const clock = useFakeTimers();
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
          const clearTimeoutSpy = spy(window, 'clearTimeout');
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.unmount();
          clearTimeoutSpy.should.not.be.called();
        });
      });

      context('showIntroduction is false', function () {
        it('should not remove click outside event listener', function () {
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ false } />);
          const removeEventListenerSpy = spy(window, 'removeEventListener');
          const handleClickOutside = wrapper.find('ItemPinButton').instance().handleClickOutside;
          wrapper.unmount();
          removeEventListenerSpy.should.not.be.calledWith('mousedown', handleClickOutside);
        });

        it('should not clear display timeout', function () {
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ false } />);
          const clearTimeoutSpy = spy(window, 'clearTimeout');
          wrapper.unmount();
          clearTimeoutSpy.should.not.be.called();
        });
      });
    });

    context('isPinButtonIntroductionVisited() is true', function () {
      beforeEach(function () {
        localStorage.setItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION, '1');
      });

      context('showIntroduction is true', function () {
        it('should remove click outside event listener', function () {
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
          const removeEventListenerSpy = spy(window, 'removeEventListener');
          const handleClickOutside = wrapper.find('ItemPinButton').instance().handleClickOutside;
          wrapper.unmount();
          removeEventListenerSpy.should.not.be.calledWith('mousedown', handleClickOutside);
        });

        it('should not clear display timeout', function () {
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
          const clearTimeoutSpy = spy(window, 'clearTimeout');
          wrapper.unmount();
          clearTimeoutSpy.should.not.be.called();
        });
      });

      context('showIntroduction is false', function () {
        it('should not remove click outside event listener', function () {
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ false } />);
          const removeEventListenerSpy = spy(window, 'removeEventListener');
          const handleClickOutside = wrapper.find('ItemPinButton').instance().handleClickOutside;
          wrapper.unmount();
          removeEventListenerSpy.should.not.be.calledWith('mousedown', handleClickOutside);
        });

        it('should not clear display timeout', function () {
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
          const clearTimeoutSpy = spy(window, 'clearTimeout');
          wrapper.unmount();
          clearTimeoutSpy.should.not.be.called();
        });
      });
    });
  });

  describe('componentDidMount', function () {
    let clock;
    beforeEach(function () {
      clock = useFakeTimers();
    });

    context('isPinButtonIntroductionVisited() is true', function () {
      beforeEach(function () {
        localStorage.setItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION, '1');
      });

      context('showIntroduction is false', function () {
        it('should not bind mousedown event on componentDidMount', function () {
          const addEventListenerSpy = spy(window, 'addEventListener');
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ false } />);
          const handleClickOutside = wrapper.find('ItemPinButton').instance().handleClickOutside;
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          addEventListenerSpy.should.not.be.calledWith(
            'mousedown',
            handleClickOutside,
          );
        });
      });

      context('showIntroduction is true', function () {
        it('should not bind mousedown event on componentDidMount', function () {
          const addEventListenerSpy = spy(window, 'addEventListener');
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
          const handleClickOutside = wrapper.find('ItemPinButton').instance().handleClickOutside;
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          addEventListenerSpy.should.not.be.calledWith(
            'mousedown',
            handleClickOutside,
          );
        });
      });
    });

    context('isPinButtonIntroductionVisited() is false', function () {
      beforeEach(function () {
        localStorage.removeItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION);
      });

      context('showIntroduction is false', function () {
        it('should not bind mousedown event on componentDidMount', function () {
          const addEventListenerSpy = spy(window, 'addEventListener');
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ false } />);
          const handleClickOutside = wrapper.find('ItemPinButton').instance().handleClickOutside;
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          addEventListenerSpy.should.not.be.calledWith(
            'mousedown',
            handleClickOutside,
          );
        });
      });

      context('showIntroduction is true', function () {
        it('should bind mousedown event on componentDidMount', function () {
          const addEventListenerSpy = spy(window, 'addEventListener');
          const wrapper = mount(<ItemPinButton item={ { isPinned: false } } showIntroduction={ true } />);
          const handleClickOutside = wrapper.find('ItemPinButton').instance().handleClickOutside;
          clock.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          addEventListenerSpy.should.be.calledWith(
            'mousedown',
            handleClickOutside,
          );
        });
      });
    });
  });
});
