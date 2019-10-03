import React from 'react';

import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { OfficerSuggestion } from 'utils/test/factories/suggestion';
import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-item';
import RecentSuggestion from 'components/search-page/search-results/recent-suggestion';


describe('RecentSuggestion component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SuggestionItem', function () {
    instance = renderIntoDocument(
      <RecentSuggestion recentSuggestions={ OfficerSuggestion.buildList(3) }/>
    );
    scryRenderedComponentsWithType(instance, SuggestionItem).should.have.length(3);
  });
});
