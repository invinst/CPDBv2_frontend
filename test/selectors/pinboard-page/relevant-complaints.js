import {
  relevantComplaintsSelector,
  relevantComplaintsNextParamsSelector,
  relevantComplaintsHasMoreSelector,
} from 'selectors/pinboard-page/relevant-complaints';


describe('RelevantComplaints selectors', function () {
  describe('relevantComplaintsSelector', function () {
    it('should return complaints data correctly', function () {
      const complaint1 = {
        'crid': '1085121',
        'category': 'Money / Property',
        'incident_date': '2017-04-04',
        'coaccused': [{
          'id': 21098,
          'rank': 'Sergeant of Police',
          'full_name': 'Daniel O Toole',
          'coaccusal_count': null,
          'percentile': {
            'year': 2016,
            'percentile_trr': '83.0024',
            'percentile_allegation': '99.2282',
            'percentile_allegation_civilian': '99.1579',
            'percentile_allegation_internal': '70.0568',
          },
        }],
        'point': { 'lon': -87.6427175, 'lat': 41.7756769 },
      };
      const complaint2 = {
        'crid': '1082207',
        'category': 'Operation/Personnel Violations',
        'incident_date': '2016-09-11',
        'coaccused': [{
          'id': 19131,
          'rank': 'Police Officer',
          'full_name': 'Michael Miller',
          'coaccusal_count': null,
          'percentile': {
            'year': 2016,
            'percentile_trr': '0.0000',
            'percentile_allegation': '87.2187',
            'percentile_allegation_civilian': '74.8804',
            'percentile_allegation_internal': '61.1521',
          },
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
            'percentile_allegation_internal': '0.0000',
          },
        }],
        'point': { 'lon': -87.6097074, 'lat': 41.6600254 },
      };
      const complaints = [complaint1, complaint2];
      const state = {
        pinboardPage: {
          relevantComplaints: {
            items: complaints,
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-complaints/?limit=20&offset=20',
              previous: null,
            },
          },
          pinItemFromPreviewPane: {
            type: 'CR',
            id: '1085121',
            isPinned: true,
          },
        },
      };

      relevantComplaintsSelector(state).should.eql([{
        crid: '1085121',
        category: 'Money / Property',
        incidentDate: 'Apr 4, 2017',
        point: { 'lon': -87.6427175, 'lat': 41.7756769 },
        officers: [{
          id: 21098,
          fullName: 'Daniel O Toole',
          shortName: 'D. O Toole',
          percentile: {
            year: 2016,
            items: [
              { axis: 'Use of Force Reports', value: 83.0024 },
              { axis: 'Officer Allegations', value: 70.0568 },
              { axis: 'Civilian Allegations', value: 99.1579 },
            ],
            visualTokenBackground: '#F52524',
            textColor: '#DFDFDF',
          },
        }],
        isPinStatusChanging: true,
        rawData: complaint1,
      },
      {
        crid: '1082207',
        category: 'Operation/Personnel Violations',
        incidentDate: 'Sep 11, 2016',
        point: { 'lon': -87.6097074, 'lat': 41.6600254 },
        officers: [{
          id: 19131,
          fullName: 'Michael Miller',
          shortName: 'M. Miller',
          percentile: {
            year: 2016,
            items: [
              { axis: 'Use of Force Reports', value: 0 },
              { axis: 'Officer Allegations', value: 61.1521 },
              { axis: 'Civilian Allegations', value: 74.8804 },
            ],
            visualTokenBackground: '#FF412C',
            textColor: '#231F20',
          },
        }, {
          id: 26640,
          fullName: 'Brian Sloyan',
          shortName: 'B. Sloyan',
          percentile: {
            year: 2016,
            items: [
              { axis: 'Use of Force Reports', value: 56.6663 },
              { axis: 'Officer Allegations', value: 0 },
              { axis: 'Civilian Allegations', value: 72.3141 },
            ],
            visualTokenBackground: '#FF6453',
            textColor: '#231F20',
          },
        }],
        isPinStatusChanging: false,
        rawData: complaint2,
      }]);
    });
  });

  describe('relevantComplaintsNextParamsSelector', function () {
    it('should return next request params', function () {
      const state = {
        pinboardPage: {
          relevantComplaints: {
            items: [],
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-complaints/?limit=10&offset=20',
              previous: '/pinboards/66ef1560/relevant-complaints/?',
            },
          },
        },
      };

      relevantComplaintsNextParamsSelector(state).should.eql({ limit: '10', offset: '20' });
    });
  });

  describe('relevantComplaintsHasMoreSelector', function () {
    it('should return true if count is greater than number of current complaints', function () {
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
            'percentile_allegation_internal': '70.0568',
          },
        }],
        'point': { 'lon': -87.6427175, 'lat': 41.7756769 },
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
            'percentile_allegation_internal': '61.1521',
          },
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
            'percentile_allegation_internal': '0.0000',
          },
        }],
        'point': { 'lon': -87.6097074, 'lat': 41.6600254 },
      }];
      const state = {
        pinboardPage: {
          relevantComplaints: {
            items: complaints,
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-complaints/?limit=20&offset=20',
              previous: null,
            },
          },
        },
      };

      relevantComplaintsHasMoreSelector(state).should.be.true();
    });

    it('should return false if count is not greater than number of current complaints', function () {
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
            'percentile_allegation_internal': '70.0568',
          },
        }],
        'point': { 'lon': -87.6427175, 'lat': 41.7756769 },
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
            'percentile_allegation_internal': '61.1521',
          },
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
            'percentile_allegation_internal': '0.0000',
          },
        }],
        'point': { 'lon': -87.6097074, 'lat': 41.6600254 },
      }];
      const state = {
        pinboardPage: {
          relevantComplaints: {
            items: complaints,
            count: 2,
            pagination: {
              next: '/pinboards/66ef1560/relevant-complaints/?limit=20&offset=20',
              previous: null,
            },
          },
        },
      };

      relevantComplaintsHasMoreSelector(state).should.be.false();
    });
  });
});
