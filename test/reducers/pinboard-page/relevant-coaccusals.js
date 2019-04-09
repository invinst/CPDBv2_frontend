import relevantCoaccusals from 'reducers/pinboard-page/relevant-coaccusals';
import * as constants from 'utils/constants';


const defaultState = { items: [], count: 0, pagination: { next: null, previous: null } };

describe('relevantCoaccusals reducer', function () {
  it('should have initial state', function () {
    relevantCoaccusals(undefined, {}).should.eql(defaultState);
  });

  it('should handle PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS', function () {
    const coaccusals = [{
      'id': 21992,
      'rank': 'Police Officer',
      'full_name': 'Johnny Patterson',
      'coaccusal_count': 24,
      'percentile': {
        'year': 2006,
        'percentile_trr': '0.0000',
        'percentile_allegation': '88.9038',
        'percentile_allegation_civilian': '49.4652',
        'percentile_allegation_internal': '85.8654'
      }
    },
    {
      'id': 2433,
      'rank': 'Police Officer',
      'full_name': 'Darren Borum',
      'coaccusal_count': 18,
      'percentile': {
        'year': 2016,
        'percentile_trr': '38.9028',
        'percentile_allegation': '86.0456',
        'percentile_allegation_civilian': '81.8766',
        'percentile_allegation_internal': '88.3297'
      }
    }];

    relevantCoaccusals(defaultState, {
      type: constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
      payload: {
        next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=20',
        previous: null,
        count: 444,
        results: coaccusals,
      }
    }).should.eql({
      items: coaccusals,
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=20',
        previous: null
      },
    });
  });

  it('should handle PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS with previous not null', function () {
    const existingCoaccusals = [{
      'id': 21992,
      'rank': 'Police Officer',
      'full_name': 'Johnny Patterson',
      'coaccusal_count': 24,
      'percentile': {
        'year': 2006,
        'percentile_trr': '0.0000',
        'percentile_allegation': '88.9038',
        'percentile_allegation_civilian': '49.4652',
        'percentile_allegation_internal': '85.8654'
      }
    }, {
      'id': 2433,
      'rank': 'Police Officer',
      'full_name': 'Darren Borum',
      'coaccusal_count': 18,
      'percentile': {
        'year': 2016,
        'percentile_trr': '38.9028',
        'percentile_allegation': '86.0456',
        'percentile_allegation_civilian': '81.8766',
        'percentile_allegation_internal': '88.3297'
      }
    }];
    const newCoaccusals = [{
      'id': 30815,
      'rank': 'Police Officer',
      'full_name': 'Beverly Williams',
      'coaccusal_count': 16,
      'percentile': {
        'year': 2012,
        'percentile_trr': '0.0000',
        'percentile_allegation': '96.5167',
        'percentile_allegation_civilian': '92.1189',
        'percentile_allegation_internal': '87.4108'
      }
    }, {
      'id': 25962,
      'rank': 'Police Officer',
      'full_name': 'Joseph Seinitz',
      'coaccusal_count': 15,
      'percentile': {
        'year': 2007,
        'percentile_trr': '0.0000',
        'percentile_allegation': '98.3394',
        'percentile_allegation_civilian': '97.9005',
        'percentile_allegation_internal': '96.4875'
      }
    }];

    const currentState = {
      items: existingCoaccusals,
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=20',
        previous: null
      }
    };

    relevantCoaccusals(currentState, {
      type: constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
      payload: {
        next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-coaccusals/?',
        count: 444,
        results: newCoaccusals,
      }
    }).should.eql({
      items: existingCoaccusals.concat(newCoaccusals),
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-coaccusals/?',
      },
    });
  });

  it('should handle PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE', function () {
    const existingCoaccusals = [{
      'id': 21992,
      'rank': 'Police Officer',
      'full_name': 'Johnny Patterson',
      'coaccusal_count': 24,
      'percentile': {
        'year': 2006,
        'percentile_trr': '0.0000',
        'percentile_allegation': '88.9038',
        'percentile_allegation_civilian': '49.4652',
        'percentile_allegation_internal': '85.8654'
      }
    },
    {
      'id': 2433,
      'rank': 'Police Officer',
      'full_name': 'Darren Borum',
      'coaccusal_count': 18,
      'percentile': {
        'year': 2016,
        'percentile_trr': '38.9028',
        'percentile_allegation': '86.0456',
        'percentile_allegation_civilian': '81.8766',
        'percentile_allegation_internal': '88.3297'
      }
    }];

    const currentState = {
      items: existingCoaccusals,
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-coaccusals/?',
      }
    };

    relevantCoaccusals(currentState, {
      type: constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
      payload: {}
    }).should.eql({
      items: existingCoaccusals,
      count: 444,
      pagination: { next: null, previous: null },
    });
  });
});
