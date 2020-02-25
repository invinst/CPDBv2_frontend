import suggestionTags from 'reducers/document-page/suggestion-tags';
import { FETCH_DOCUMENT_SUGGESTION_TAGS_SUCCESS } from 'utils/constants';


describe('suggestionTags reducer', function () {
  it('should return initial state', function () {
    suggestionTags(undefined, {}).should.eql([]);
  });

  it('should return correct suggestion tags on FETCH_DOCUMENT_SUGGESTION_TAGS_SUCCESS', function () {
    const tags = ['tag 1', 'tag 2'];
    suggestionTags(undefined, {
      type: FETCH_DOCUMENT_SUGGESTION_TAGS_SUCCESS,
      payload: tags,
    }).should.eql(tags);
  });
});
