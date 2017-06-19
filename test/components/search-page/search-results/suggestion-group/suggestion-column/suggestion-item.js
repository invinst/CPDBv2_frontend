import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  Simulate
} from 'react-addons-test-utils';
import { spy, useFakeTimers } from 'sinon';
import { Link } from 'react-router';

import SuggestionItem, {
  UnwrappedSuggestionItem
} from 'components/search-page/search-results/suggestion-group/suggestion-column/suggestion-item';
import { unmountComponentSuppressError } from 'utils/test';


describe('<SuggestionItem/>', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SuggestionItem.should.be.renderable();
  });

  it('should trigger suggestionClick when user click on a suggestion', function () {
    const suggestionClick = spy();
    const text = 'text';
    const url = 'url';
    const contentType = 'contentType';
    const suggestion = {
      payload: {
        'result_text': text,
        url
      }
    };

    instance = renderIntoDocument(
      <SuggestionItem
        suggestionClick={ suggestionClick }
        suggestion={ suggestion }
        contentType={ contentType }/>
    );

    const suggestionElement = findRenderedDOMComponentWithTag(instance, 'a');
    Simulate.click(suggestionElement);
    suggestionClick.calledWith(contentType, text, url).should.be.true();
  });

  it('should render Link component when suggestion contain to', function () {
    instance = renderIntoDocument(
      <SuggestionItem suggestion={ { payload: { to: 'abc' } } }/>
    );
    findRenderedComponentWithType(instance, Link);
  });

  describe('when focused/hovered', function () {
    beforeEach(function () {
      this.suggestion = {
        payload: {
          'result_text': 'my text',
          'result_extra_information': 'my extra text',
          tags: ['my tag']
        }
      };
    });

    it('should render focused item\'s colors correctly', function () {
      instance = renderIntoDocument(
        <SuggestionItem isFocused={ true } suggestion={ this.suggestion }/>
      );

      const text = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-text');
      const extraText = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-extra-text');
      const tag = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-tag');
      text.style.color.should.eql('rgb(0, 94, 244)');
      extraText.style.color.should.eql('rgb(76, 142, 248)');
      tag.style.color.should.eql('rgb(76, 142, 248)');
    });

    it('should render hovered item\'s colors correctly', function () {
      instance = renderIntoDocument(
        <SuggestionItem isFocused={ false } hovering={ true } suggestion={ this.suggestion }/>
      );

      const text = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-text');
      const extraText = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-extra-text');
      const tag = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-tag');
      text.style.color.should.eql('rgb(0, 94, 244)');
      extraText.style.color.should.eql('rgb(0, 94, 244)');
      tag.style.color.should.eql('rgb(0, 94, 244)');
    });
  });

  describe('when entering focused state', function () {
    beforeEach(function () {
      this.clock = useFakeTimers();
    });

    afterEach(function () {
      this.clock.restore();
    });

    it('should set state.enter to `true` then reset it immediately after', function () {
      const element = document.createElement('div');

      const component = ReactDOM.render(<UnwrappedSuggestionItem isFocused={ false } />, element);
      component.state.enteringFocusedState.should.be.false();

      ReactDOM.render(<UnwrappedSuggestionItem isFocused={ true } />, element);
      component.state.enteringFocusedState.should.be.true();

      this.clock.tick(50);
      component.state.enteringFocusedState.should.be.false();
    });
  });
});
