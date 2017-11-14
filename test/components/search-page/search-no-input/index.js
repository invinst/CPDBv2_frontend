import React from 'react';

import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import SearchNoInput from 'components/search-page/search-no-input';
import RecentSuggestion from 'components/search-page/search-no-input/recent-suggestion';
import { unmountComponentSuppressError } from 'utils/test';
import recentSuggestionFactory from 'utils/test/factories/recent-suggestion';
import SuggestedCards from 'components/search-page/search-no-input/suggested-cards';


describe('<SearchNoInput/>', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should not render RecentSuggestion if there\'s no recent suggesions', function () {
    instance = renderIntoDocument(
      <SearchNoInput recentSuggestions={ [] }/>
    );

    scryRenderedComponentsWithType(instance, RecentSuggestion).length.should.equal(0);
  });

  it('should render RecentSuggestion if has recent suggestions', function () {
    instance = renderIntoDocument(
      <SearchNoInput recentSuggestions={ recentSuggestionFactory.buildList(1) }/>
    );

    scryRenderedComponentsWithType(instance, RecentSuggestion).length.should.equal(1);
  });

  it('should render SuggestedCards if has officerCards', function () {
    instance = renderIntoDocument(
      <SearchNoInput officerCards={ ['one', 'two', 'three', 'four'] }/>
    );

    let suggestedCardsComponent = findRenderedComponentWithType(instance, SuggestedCards);
    suggestedCardsComponent.props.cards.should.eql(['one', 'two', 'three', 'four']);
  });
});
