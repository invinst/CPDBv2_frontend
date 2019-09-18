import React from 'react';
import { noop } from 'lodash';
import {
  renderIntoDocument, Simulate,
  findRenderedComponentWithType, findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import Mousestrap from 'mousetrap';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import JumpyMotion from 'components/animation/jumpy-motion';
import withPinnableItem
  from 'components/search-page/search-results/suggestion-group/suggestion-item/with-pinnable-item';
import TextWithInlineSearchAlias
  from 'components/search-page/search-results/suggestion-group/suggestion-item/text-with-inline-search-alias';
import EditModeItem from 'components/search-page/search-results/suggestion-group/suggestion-item/edit-mode-item';
import ItemPinButton from 'components/search-page/search-results/suggestion-group/suggestion-item/item-pin-button';


describe('withPinnableItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
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
      instance = renderIntoDocument(<ComponentType { ...props } />);

      const nextProps = {
        isFocused: props.isFocused,
        suggestion: {
          text: 'changed',
        },
      };

      instance.shouldComponentUpdate(nextProps).should.be.true();
    });

    it('should rerender if focused change', function () {
      instance = renderIntoDocument(<ComponentType { ...props } />);

      instance.shouldComponentUpdate({ isFocused: !props.isFocused }).should.be.true();
    });

    it('should render first row', function () {
      instance = renderIntoDocument(<ComponentType { ...props } />);

      findRenderedDOMComponentWithClass(instance, 'test--first-row').should.be.ok();
      findRenderedComponentWithType(instance, TextWithInlineSearchAlias).should.be.ok();
    });

    it('should render second row', function () {
      instance = renderIntoDocument(<ComponentType { ...props } />);

      findRenderedDOMComponentWithClass(instance, 'test--second-row').should.be.ok();
    });

    it('should render content with edit mode item', function () {
      instance = renderIntoDocument(<ComponentType { ...props } />);

      findRenderedComponentWithType(instance, EditModeItem).should.be.ok();
    });

    it('should render content inside jummy motion', function () {
      instance = renderIntoDocument(<ComponentType { ...props } />);

      findRenderedComponentWithType(instance, JumpyMotion).should.be.ok();
    });

    it('should call selectItem if not focused', function () {
      const suggestion = {
        uniqueKey: '123',
        type: 'type',
      };
      const selectItemSpy = spy();
      instance = renderIntoDocument(
        <ComponentType
          suggestion={ suggestion }
          selectItem={ selectItemSpy }
          isFocused={ false }/>
      );
      const element = findRenderedDOMComponentWithClass(instance, 'suggestion-item-123');
      Simulate.click(element);
      selectItemSpy.called.should.be.true();
    });

    it('should trigger ENTER event if focused', function () {
      const suggestion = {
        uniqueKey: '123',
        type: 'type',
      };
      const triggerStub = stub(Mousestrap, 'trigger');
      instance = renderIntoDocument(
        <ComponentType
          suggestion={ suggestion }
          isFocused={ true }/>
      );
      const element = findRenderedDOMComponentWithClass(instance, 'suggestion-item-123');
      Simulate.click(element);
      triggerStub.withArgs('enter').called.should.be.true();

      triggerStub.restore();
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
      instance = renderIntoDocument(<ComponentType { ...props } />);

      findRenderedComponentWithType(instance, ItemPinButton).should.be.ok();
    });
  });
});
