import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import stories from 'reducers/landing-page/story-app/stories';


describe('stories reducer', function () {
  it('should return initial state', function () {
    stories(undefined, {}).should.eql([]);
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    const expectedStories = [1, 2, 3];
    stories(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: { reports: expectedStories }
    }).should.eql(expectedStories);
  });

  it('should handle LANDING_PAGE_REQUEST_FAILURE', function () {
    stories([1, 2, 3], {
      type: LANDING_PAGE_REQUEST_FAILURE
    }).should.eql([]);
  });
});
