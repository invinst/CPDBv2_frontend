import * as constants from 'utils/constants';
import suggestionGroups from 'reducers/search-page/suggestion-groups';


describe('searchPage.suggestionGroups reducer', function () {
  it('should have initial state', function () {
    suggestionGroups(undefined, {}).should.deepEqual({
      meta: {}
    });
  });

  it('should handle SUGGESTION_REQUEST_START', function () {
    suggestionGroups(undefined, {
      type: constants.SUGGESTION_REQUEST_START
    }).should.deepEqual({
      meta: {}
    });
  });

  it('should handle SUGGESTION_REQUEST_FAILURE', function () {
    suggestionGroups(undefined, {
      type: constants.SUGGESTION_REQUEST_FAILURE
    }).should.deepEqual({
      meta: {}
    });
  });

  it('should handle SUGGESTION_REQUEST_SUCCESS', function () {
    suggestionGroups(undefined, {
      type: constants.SUGGESTION_REQUEST_SUCCESS,
      request: {
        url: 'example.com'
      },
      payload: {
        'neighborhoods': [{ a: 1 }],
        'officer_badge_number': [{ b: 2 }],
        'officer_name': [{ c: 3 }],
        'unit': []
      }
    }).should.deepEqual({
      'neighborhoods': [{ a: 1 }],
      'officer_badge_number': [{ b: 2 }],
      'officer_name': [{ c: 3 }],
      meta: {
        url: 'example.com'
      }
    });
  });

  it('should handle SUGGESTION_SINGLE_REQUEST_START', function () {
    suggestionGroups(undefined, {
      type: constants.SUGGESTION_SINGLE_REQUEST_START
    }).should.deepEqual({
      meta: {}
    });
  });

  it('should handle SUGGESTION_SINGLE_REQUEST_FAILURE', function () {
    suggestionGroups(undefined, {
      type: constants.SUGGESTION_SINGLE_REQUEST_FAILURE
    }).should.deepEqual({
      meta: {}
    });
  });

  it('should handle SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    suggestionGroups({
      meta: {
        url: 'example.com'
      },
      officers: [{
        id: 1,
        a: 'b'
      }],
      cr: [{
        id: 1,
        a: 'b'
      }]
    }, {
      type: constants.SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        results: [{
          id: 1,
          a: 'b'
        }, {
          id: 2,
          c: 'd'
        }]
      },
      request: {
        params: {
          contentType: 'officers'
        },
        url: 'new.example.com'
      }
    }).should.deepEqual({
      officers: [{
        id: 1,
        a: 'b'
      }, {
        id: 2,
        c: 'd'
      }],
      cr: [{
        id: 1,
        a: 'b'
      }],
      meta: {
        url: 'new.example.com'
      }
    });
  });

  it('should handle LOCATION_CHANGE', function () {
    suggestionGroups(undefined, {
      type: constants.LOCATION_CHANGE
    }).should.deepEqual({
      meta: {}
    });
  });
});
