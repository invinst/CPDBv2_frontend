import React from 'react';
import { shallow } from 'enzyme';

import { OfficerSuggestion } from 'utils/test/factories/suggestion';
import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-item';
import RecentSuggestion from 'components/search-page/search-results/recent-suggestion';


describe('RecentSuggestion component', function () {
  it('should render correctly', function () {
    const suggestions = OfficerSuggestion.buildList(3);
    const wrapper = shallow(
      <RecentSuggestion recentSuggestions={ suggestions }/>
    );
    const suggestionItems = wrapper.find(SuggestionItem);
    suggestionItems.should.have.length(3);
  });
});
