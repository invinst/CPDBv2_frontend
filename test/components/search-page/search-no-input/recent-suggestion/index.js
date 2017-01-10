import RecentSuggestion from 'components/search-page/search-no-input/recent-suggestion';
import recentSuggestionFactory from 'utils/test/factories/recent-suggestion';


describe('<RecentSuggestion />', function () {
  it('should be renderable', function () {
    RecentSuggestion.should.be.renderable({
      recentSuggestions: recentSuggestionFactory.buildList(1)
    });
  });
});
