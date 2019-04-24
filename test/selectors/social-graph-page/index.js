import { officersSelector, coaccusedDataSelector, getListEvent } from 'selectors/social-graph-page';


describe('Social Graph page selectors', function () {
  describe('officersSelector', function () {
    it('should return officers correctly', function () {
      const state = {
        socialGraphPage: {
          graphData: {
            officers: [
              {
                'full_name': 'Jerome Finnigan',
                'id': 1,
                'percentile': {
                  'officer_id': 1,
                  'year': 2007,
                  'percentile_allegation': '91.5',
                  'percentile_allegation_civilian': '97.0',
                  'percentile_allegation_internal': '82.0',
                  'percentile_trr': '92.3'
                },
              },
              {
                'full_name': 'Edward May',
                'id': 2,
                'percentile': {
                  'officer_id': 2,
                  'year': 2008,
                  'percentile_allegation': '90',
                  'percentile_allegation_civilian': '95.7',
                  'percentile_allegation_internal': '81.5',
                  'percentile_trr': '94.3'
                },
              }
            ]
          }
        }
      };

      officersSelector(state).should.eql([{
        fullName: 'Jerome Finnigan',
        id: 1,
        percentile: {
          officerId: 1,
          year: 2007,
          items: [
            { axis: 'Use of Force Reports', value: 92.3 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 }
          ],
          visualTokenBackground: '#f52524',
          textColor: '#DFDFDF'
        }
      }, {
        fullName: 'Edward May',
        id: 2,
        percentile: {
          officerId: 2,
          year: 2008,
          items: [
            { axis: 'Use of Force Reports', value: 94.3 },
            { axis: 'Officer Allegations', value: 81.5 },
            { axis: 'Civilian Allegations', value: 95.7 }
          ],
          visualTokenBackground: '#f52524',
          textColor: '#DFDFDF'
        }
      }]);
    });
  });

  describe('coaccusedDataSelector', function () {
    it('should return coaccused data correctly', function () {
      const state = {
        socialGraphPage: {
          graphData: {
            'coaccused_data': [
              {
                'officer_id_1': 1,
                'officer_id_2': 2,
                'incident_date': '1988-10-03T00:00:00Z',
                'accussed_count': 1,
              },
              {
                'officer_id_1': 3,
                'officer_id_2': 4,
                'incident_date': '1990-10-03T00:00:00Z',
                'accussed_count': 5,
              }
            ]
          }
        }
      };

      coaccusedDataSelector(state).should.eql([{
        officerId1: 1,
        officerId2: 2,
        incidentDate: '1988-10-03T00:00:00Z',
        accussedCount: 1
      }, {
        officerId1: 3,
        officerId2: 4,
        incidentDate: '1990-10-03T00:00:00Z',
        accussedCount: 5
      }]);
    });
  });

  describe('getListEvent', function () {
    it('should return list events correctly', function () {
      const state = {
        socialGraphPage: {
          graphData: {
            'list_event': [
              '1988-10-03 00:00:00+00:00',
              '1989-12-11 00:00:00+00:00',
              '1990-01-09 00:00:00+00:00',
              '1990-12-13 00:00:00+00:00',
              '1991-01-02 00:00:00+00:00',
              '1991-01-06 00:00:00+00:00',
              '1991-01-15 00:00:00+00:00',
              '1991-02-18 00:00:00+00:00',
              '1991-02-20 00:00:00+00:00',
              '1991-03-06 00:00:00+00:00'
            ]
          }
        }
      };

      getListEvent(state).should.eql([
        '1988-10-03 00:00:00+00:00',
        '1989-12-11 00:00:00+00:00',
        '1990-01-09 00:00:00+00:00',
        '1990-12-13 00:00:00+00:00',
        '1991-01-02 00:00:00+00:00',
        '1991-01-06 00:00:00+00:00',
        '1991-01-15 00:00:00+00:00',
        '1991-02-18 00:00:00+00:00',
        '1991-02-20 00:00:00+00:00',
        '1991-03-06 00:00:00+00:00'
      ]);
    });
  });
});
