import React from 'react';
import { shallow } from 'enzyme';

import { OfficerSuggestion } from 'utils/test/factories/suggestion';
import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-item';
import RecentSuggestion from 'components/search-page/search-results/recent-suggestion';


describe('RecentSuggestion component', function () {
  it('should render SuggestionItem', function () {
    const wrapper = shallow(
      <RecentSuggestion recentSuggestions={ OfficerSuggestion.buildList(3) }/>
    );
    wrapper.find(SuggestionItem).should.have.length(3);
  });
});
