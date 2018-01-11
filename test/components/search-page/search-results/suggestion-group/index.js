import React from 'react';

import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import { unmountComponentSuppressError } from 'utils/test';
import { OfficerSuggestion } from 'utils/test/factories/suggestion';
import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-item';


describe('SuggestionGroup component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SuggestionItem', function () {
    instance = renderIntoDocument(
      <SuggestionGroup suggestions={ OfficerSuggestion.buildList(3) }/>
    );
    scryRenderedComponentsWithType(instance, SuggestionItem).should.have.length(3);
  });

  it('should render `More` if canLoadMore is true', function () {
    instance = renderIntoDocument(
      <SuggestionGroup canLoadMore={ true }/>
    );
    findDOMNode(instance).textContent.should.containEql('More');
  });
});
