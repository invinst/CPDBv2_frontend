import relevantComplaints from 'reducers/pinboard-page/relevant-complaints';
import * as constants from 'utils/constants';


const defaultState = { requesting: false, items: [], count: 0, pagination: { next: null, previous: null } };

describe('relevantComplaints reducer', function () {
  it('should have initial state', function () {
    relevantComplaints(undefined, {}).should.eql(defaultState);
  });

  it('should handle PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START', function () {
    relevantComplaints(defaultState, {
      type: constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
    }).should.eql({
      requesting: true,
      items: [],
      count: 0,
      pagination: {
        next: null,
        previous: null
      },
    });
  });


  it('should handle PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS', function () {
    const complaints = [{
      'crid': '1085121',
      'category': 'Money / Property',
      'incident_date': '2017-04-04',
      'officers': [{
        'id': 21098,
        'rank': 'Sergeant of Police',
        'full_name': 'Daniel O Toole',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '83.0024',
          'percentile_allegation': '99.2282',
          'percentile_allegation_civilian': '99.1579',
          'percentile_allegation_internal': '70.0568'
        }
      }],
      'point': { 'lon': -87.6427175, 'lat': 41.7756769 }
    }, {
      'crid': '1082207',
      'category': 'Operation/Personnel Violations',
      'incident_date': '2016-09-11',
      'officers': [{
        'id': 19131,
        'rank': 'Police Officer',
        'full_name': 'Michael Miller',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '0.0000',
          'percentile_allegation': '87.2187',
          'percentile_allegation_civilian': '74.8804',
          'percentile_allegation_internal': '61.1521'
        }
      }, {
        'id': 26640,
        'rank': 'Police Officer',
        'full_name': 'Brian Sloyan',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '56.6663',
          'percentile_allegation': '68.2549',
          'percentile_allegation_civilian': '72.3141',
          'percentile_allegation_internal': '0.0000'
        }
      }],
      'point': { 'lon': -87.6097074, 'lat': 41.6600254 }
    }];

    relevantComplaints(defaultState, {
      type: constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
      payload: {
        next: '/pinboards/66ef1560/relevant-complaints/?limit=20&offset=20',
        previous: null,
        count: 444,
        results: complaints,
      }
    }).should.eql({
      requesting: false,
      items: complaints,
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-complaints/?limit=20&offset=20',
        previous: null
      },
    });
  });

  it('should handle PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS with previous', function () {
    const existingComplaints = [{
      'crid': '1085121',
      'category': 'Money / Property',
      'incident_date': '2017-04-04',
      'officers': [{
        'id': 21098,
        'rank': 'Sergeant of Police',
        'full_name': 'Daniel O Toole',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '83.0024',
          'percentile_allegation': '99.2282',
          'percentile_allegation_civilian': '99.1579',
          'percentile_allegation_internal': '70.0568'
        }
      }],
      'point': { 'lon': -87.6427175, 'lat': 41.7756769 }
    }, {
      'crid': '1082207',
      'category': 'Operation/Personnel Violations',
      'incident_date': '2016-09-11',
      'officers': [{
        'id': 19131,
        'rank': 'Police Officer',
        'full_name': 'Michael Miller',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '0.0000',
          'percentile_allegation': '87.2187',
          'percentile_allegation_civilian': '74.8804',
          'percentile_allegation_internal': '61.1521'
        }
      }, {
        'id': 26640,
        'rank': 'Police Officer',
        'full_name': 'Brian Sloyan',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '56.6663',
          'percentile_allegation': '68.2549',
          'percentile_allegation_civilian': '72.3141',
          'percentile_allegation_internal': '0.0000'
        }
      }],
      'point': { 'lon': -87.6097074, 'lat': 41.6600254 }
    }];
    const newComplaints = [{
      'crid': '1081231',
      'category': 'Unknown',
      'incident_date': '2016-06-01',
      'officers': [{
        'id': 31859,
        'rank': 'Sergeant of Police',
        'full_name': 'Eric Cato',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '72.1094',
          'percentile_allegation': '99.4803',
          'percentile_allegation_civilian': '99.1379',
          'percentile_allegation_internal': '88.3297'
        }
      }],
      'point': { 'lon': -87.6297982, 'lat': 41.8781136 }
    }, {
      'crid': '1079879',
      'category': 'Unknown',
      'incident_date': '2016-03-29',
      'officers': [],
      'point': { 'lon': -87.6603479, 'lat': 41.8784509 }
    }];

    const currentState = {
      items: existingComplaints,
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-complaints/?limit=20&offset=20',
        previous: null
      }
    };

    relevantComplaints(currentState, {
      type: constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
      payload: {
        next: '/pinboards/66ef1560/relevant-complaints/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-complaints/?',
        count: 444,
        results: newComplaints,
      }
    }).should.eql({
      requesting: false,
      items: existingComplaints.concat(newComplaints),
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-complaints/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-complaints/?',
      },
    });
  });

  it('should handle PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE', function () {
    const existingComplaints = [{
      'crid': '1085121',
      'category': 'Money / Property',
      'incident_date': '2017-04-04',
      'officers': [{
        'id': 21098,
        'rank': 'Sergeant of Police',
        'full_name': 'Daniel O Toole',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '83.0024',
          'percentile_allegation': '99.2282',
          'percentile_allegation_civilian': '99.1579',
          'percentile_allegation_internal': '70.0568'
        }
      }],
      'point': { 'lon': -87.6427175, 'lat': 41.7756769 }
    }, {
      'crid': '1082207',
      'category': 'Operation/Personnel Violations',
      'incident_date': '2016-09-11',
      'officers': [{
        'id': 19131,
        'rank': 'Police Officer',
        'full_name': 'Michael Miller',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '0.0000',
          'percentile_allegation': '87.2187',
          'percentile_allegation_civilian': '74.8804',
          'percentile_allegation_internal': '61.1521'
        }
      }, {
        'id': 26640,
        'rank': 'Police Officer',
        'full_name': 'Brian Sloyan',
        'coaccusal_count': null,
        'percentile': {
          'year': 2016,
          'percentile_trr': '56.6663',
          'percentile_allegation': '68.2549',
          'percentile_allegation_civilian': '72.3141',
          'percentile_allegation_internal': '0.0000'
        }
      }],
      'point': { 'lon': -87.6097074, 'lat': 41.6600254 }
    }];

    const currentState = {
      items: existingComplaints,
      count: 444,
      pagination: {
        next: '/pinboards/66ef1560/relevant-complaints/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-complaints/?',
      }
    };

    relevantComplaints(currentState, {
      type: constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
      payload: {}
    }).should.eql({
      requesting: false,
      items: existingComplaints,
      count: 444,
      pagination: { next: null, previous: null },
    });
  });
});
