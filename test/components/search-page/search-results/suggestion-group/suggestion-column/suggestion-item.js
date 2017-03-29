import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithTag, Simulate, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';
import { Link } from 'react-router';

import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-column/suggestion-item';
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
});

