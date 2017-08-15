import React from 'react';
import { Provider } from 'react-redux';
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';
import MockStore from 'redux-mock-store';

import SuggestionColumn from 'components/search-page/search-results/suggestion-group/suggestion-column';
import { unmountComponentSuppressError } from 'utils/test';


describe('SuggestionColumn component', function () {
  let instance;

  const mockStore = MockStore();
  const store = mockStore();

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SuggestionColumn.should.be.renderable();
  });

  it('should trigger suggestionClick when user click on a suggestion', function () {
    const suggestionClick = spy();
    const text = 'text';
    const url = 'url';
    const contentType = 'contentType';
    const suggestions = [{
      payload: {
        'result_text': text,
        url
      }
    }];

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SuggestionColumn
          suggestionClick={ suggestionClick }
          suggestions={ suggestions }
          contentType={ contentType }/>
      </Provider>
    );

    const suggestionElement = findRenderedDOMComponentWithTag(instance, 'a');
    Simulate.click(suggestionElement);
    suggestionClick.calledWith(contentType, text, url).should.be.true();
  });

  describe('shouldComponentUpdate', function () {
    it('should re-render if this is the active column', function () {
      SuggestionColumn.prototype.shouldComponentUpdate({
        columnIndex: 1,
        navigation: {
          columnIndex: 1
        }
      }).should.be.true();
    });

    it('should re-render if this is right before the active column', function () {
      SuggestionColumn.prototype.shouldComponentUpdate({
        columnIndex: 1,
        navigation: {
          columnIndex: 2
        }
      }).should.be.true();
    });

    it('should re-render if this is right after the active column', function () {
      SuggestionColumn.prototype.shouldComponentUpdate({
        columnIndex: 3,
        navigation: {
          columnIndex: 2
        }
      }).should.be.true();
    });

    it('should not re-render if this is neither the active column nor next to it', function () {
      SuggestionColumn.prototype.shouldComponentUpdate({
        columnIndex: 0,
        navigation: {
          columnIndex: 2
        }
      }).should.be.false();
    });

  });
});
