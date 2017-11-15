import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  Simulate
} from 'react-addons-test-utils';
import { spy, useFakeTimers } from 'sinon';
import { Link } from 'react-router';
import MockStore from 'redux-mock-store';

import SuggestionItem, {
  UnwrappedSuggestionItem
} from 'components/search-page/search-results/suggestion-group/suggestion-column/suggestion-item';

import
  SuggestionItemText
from 'components/search-page/search-results/suggestion-group/suggestion-column/suggestion-item-text';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerVisualToken from 'components/visual-token/officer-visual-token';


describe('<SuggestionItem/>', function () {
  let instance;

  const mockStore = MockStore();
  const store = mockStore();

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SuggestionItem.should.be.renderable({ store });
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
      <Provider store={ store }>
        <SuggestionItem
          suggestionClick={ suggestionClick }
          suggestion={ suggestion }
          contentType={ contentType }/>
      </Provider>
    );

    const suggestionElement = findRenderedDOMComponentWithTag(instance, 'a');
    Simulate.click(suggestionElement);
    suggestionClick.calledWith(contentType, text, url).should.be.true();
  });

  it('should render Link component when suggestion contain to', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SuggestionItem suggestion={ { payload: { to: 'abc' } } }/>
      </Provider>
    );
    findRenderedComponentWithType(instance, Link);
  });

  it('should render OfficerVisualToken component when suggestionType is officer', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SuggestionItem
          suggestion={ { payload: {
            to: 'abc',
            'visual_token_background_color': 'red'
          } } }
          suggestionType='officer'
      />
      </Provider>
    );
    findRenderedComponentWithType(instance, OfficerVisualToken);
  });

  it('should render suggestion thumbnail placeholder when suggestionType is not officer', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SuggestionItem
          suggestion={ { payload: {
            to: 'abc',
          } } }
          suggestionType='not officer'
      />
      </Provider>
    );
    findRenderedDOMComponentWithClass(instance, 'test--suggestion-thumbnail-placeholder');
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
        <Provider store={ store }>
          <SuggestionItem isFocused={ true } suggestion={ this.suggestion }/>
        </Provider>
      );

      const text = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-text');
      const extraText = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-extra-text');
      const reason = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-reason');
      text.style.color.should.eql('rgb(0, 94, 244)');
      extraText.style.color.should.eql('rgb(0, 94, 244)');
      extraText.style.opacity.should.eql('0.5');
      reason.style.color.should.eql('rgb(76, 142, 248)');
    });

    it('should render hovered item\'s colors correctly', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SuggestionItem isFocused={ false } hovering={ true } suggestion={ this.suggestion }/>
        </Provider>
      );

      const text = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-text');
      const extraText = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-extra-text');
      const reason = findRenderedDOMComponentWithClass(instance, 'test--suggestion-item-reason');
      text.style.color.should.eql('rgb(0, 94, 244)');
      extraText.style.color.should.eql('rgb(0, 94, 244)');
      reason.style.color.should.eql('rgb(0, 94, 244)');
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

      const component = ReactDOM.render(
        <Provider store={ store }>
          <UnwrappedSuggestionItem isFocused={ false } />
        </Provider>, element
      );
      const suggestionItemText = findRenderedComponentWithType(component, SuggestionItemText);
      suggestionItemText.props.enteringFocusedState.should.be.false();

      ReactDOM.render(
        <Provider store={ store }>
          <UnwrappedSuggestionItem isFocused={ true } />
        </Provider>, element
      );
      suggestionItemText.props.enteringFocusedState.should.be.true();

      this.clock.tick(50);
      suggestionItemText.props.enteringFocusedState.should.be.false();
    });
  });

  describe('when edit mode off', function () {
    it('should not display aliases', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SuggestionItem
            aliasEditModeOn={ false }
            suggestion={ { payload: {
              'result_reason': '',
              tags: ['myAlias'],
              to: 'abc'
            } } }/>
        </Provider>
      );
      const div = findRenderedDOMComponentWithClass(instance, 'link--transition test--suggestion-item-reason');
      div.textContent.should.not.containEql('myAlias');
    });
  });

  describe('when edit mode on', function () {
    it('should display aliases', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SuggestionItem
            aliasEditModeOn={ true }
            suggestion={ { payload: {
              'result_reason': '',
              tags: ['myAlias'],
              to: 'abc'
            } } }/>
        </Provider>
      );
      const div = findRenderedDOMComponentWithClass(instance, 'link--transition test--suggestion-item-reason');
      div.textContent.should.containEql('myAlias');
    });
  });
});
