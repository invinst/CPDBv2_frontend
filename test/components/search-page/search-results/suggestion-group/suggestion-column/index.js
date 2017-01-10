import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';

import SuggestionColumn from 'components/search-page/search-results/suggestion-group/suggestion-column';
import { unmountComponentSuppressError } from 'utils/test';


describe('SuggestionColumn component', function () {
  let instance;

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
      <SuggestionColumn
        suggestionClick={ suggestionClick }
        suggestions={ suggestions }
        contentType={ contentType }/>
    );

    const suggestionElement = findRenderedDOMComponentWithTag(instance, 'a');
    Simulate.click(suggestionElement);
    suggestionClick.calledWith(contentType, text, url).should.be.true();
  });
});
