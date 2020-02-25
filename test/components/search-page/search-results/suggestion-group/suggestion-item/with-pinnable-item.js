import React from 'react';
import { shallow, mount } from 'enzyme';
import { noop } from 'lodash';
import Mousestrap from 'mousetrap';
import { spy, stub } from 'sinon';

import { mountWithRouter } from 'utils/test';
import JumpyMotion from 'components/animation/jumpy-motion';
import withPinnableItem
  from 'components/search-page/search-results/suggestion-group/suggestion-item/with-pinnable-item';
import TextWithInlineSearchAlias
  from 'components/search-page/search-results/suggestion-group/suggestion-item/text-with-inline-search-alias';
import EditModeItem from 'components/search-page/search-results/suggestion-group/suggestion-item/edit-mode-item';
import ItemPinButton from 'components/common/item-pin-button';


describe('withPinnableItem component', function () {
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
      },
      isFocused: false,
      aliasEditModeOn: false,
      selectItem: noop,
    };

    it('should render item pin button', function () {
      const wrapper = shallow(<ComponentType { ...props } />);

      wrapper.find(ItemPinButton).exists().should.be.true();
    });
  });
});
