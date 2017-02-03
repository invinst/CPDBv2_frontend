import recentSuggestions from 'reducers/search-page/recent-suggestions';
import { TRACK_RECENT_SUGGESTION } from 'actions/search-page';
import recentSuggestionFactory from 'utils/test/factories/recent-suggestion';


describe('recentSuggestions reducer', function () {
  it('should handle TRACK_RECENT_SUGGESTION', function () {
    const recentSuggestion = recentSuggestionFactory.build();

    recentSuggestions(undefined, {
      type: TRACK_RECENT_SUGGESTION,
      payload: recentSuggestion
    }).should.deepEqual([recentSuggestion]);
  });

  it('should be unchanged if receive same payload', function () {
    const recentSuggestion = recentSuggestionFactory.build();

    recentSuggestions([recentSuggestion], {
      type: TRACK_RECENT_SUGGESTION,
      payload: recentSuggestion
    }).length.should.equal(1);
  });

  it('should keep 10 recent suggestions only', function () {
    const recentSuggestion = recentSuggestionFactory.build();
    const state = recentSuggestionFactory.buildList(10);

    recentSuggestions(state, {
      type: TRACK_RECENT_SUGGESTION,
      payload: recentSuggestion
    }).length.should.equal(10);
  });

  it('should put the most recent suggestion at top', function () {
    const recentSuggestion = recentSuggestionFactory.build();
    const state = [recentSuggestionFactory.build()];
    const recents = recentSuggestions(state, {
      type: TRACK_RECENT_SUGGESTION,
      payload: recentSuggestion
    });

    recents.length.should.equal(2);
    recents[0].should.be.deepEqual(recentSuggestion);
  });
});
