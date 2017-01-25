import RecentSuggestionItem from 'components/search-page/search-no-input/recent-suggestion/recent-suggestion-item';
import recentSuggestionFactory from 'utils/test/factories/recent-suggestion';


describe('<RecentSuggestion />', function () {
  it('should be renderable', function () {
    RecentSuggestionItem.should.be.renderable({
      entry: recentSuggestionFactory.build()
    });
  });
});

