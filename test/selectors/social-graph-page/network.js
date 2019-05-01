import {
  officersSelector,
  coaccusedDataSelector,
  getListEvent,
  officerDetailTransform,
  networkOfficerSelector
} from 'selectors/social-graph-page/network';


describe('Social Graph page selectors', function () {
  describe('officersSelector', function () {
    it('should return officers correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            graphData: {
              officers: [
                {
                  'full_name': 'Jerome Finnigan',
                  'id': 1,
                },
                {
                  'full_name': 'Edward May',
                  'id': 2,
                }
              ]
            }
          }
        }
      };

      officersSelector(state).should.eql([{ fullName: 'Jerome Finnigan', id: 1 }, { fullName: 'Edward May', id: 2 }]);
    });
  });

  describe('coaccusedDataSelector', function () {
    it('should return coaccused data correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
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
            },
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
          networkData: {
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

  describe('officerDetailTransform', function () {
    it('should return officer correctly', function () {
      const officer = {
        'id': 123,
        'full_name': 'Jerome Finnigan',
        'appointed_date': '2001-07-08',
        'resignation_date': '2005-10-10',
        'badge': '123456',
        'gender': 'Male',
        'birth_year': 1970,
        'race': 'White',
        'rank': 'Police Officer',
        'unit': {
          'id': 456,
          'unit_name': 'Unit 715',
          'description': 'This is unit description',
        },
        'allegation_count': 10,
        'sustained_count': 5,
        'civilian_compliment_count': 20,
        'discipline_count': 3,
        'trr_count': 7,
        'major_award_count': 15,
        'honorable_mention_count': 12,
        'percentile': {
          'officer_id': 123,
          'year': 2017,
          'percentile_allegation': '95',
          'percentile_trr': '90',
          'percentile_allegation_civilian': '97.0',
          'percentile_allegation_internal': '82.0',
        },
        'honorable_mention_percentile': '70'
      };
      officerDetailTransform(officer).should.eql({
        id: 123,
        to: '/officer/123/jerome-finnigan/',
        fullName: 'Jerome Finnigan',
        appointedDate: 'JUL 8, 2001',
        resignationDate: 'OCT 10, 2005',
        badge: '123456',
        gender: 'Male',
        age: 47,
        race: 'White',
        rank: 'Police Officer',
        unit: {
          id: 456,
          unitName: 'Unit 715',
          description: 'This is unit description',
        },
        complaintCount: 10,
        civilianComplimentCount: 20,
        sustainedCount: 5,
        disciplineCount: 3,
        trrCount: 7,
        majorAwardCount: 15,
        honorableMentionCount: 12,
        honorableMentionPercentile: 70,
        trrPercentile: 90,
        complaintPercentile: 95,
        lastPercentile: {
          officerId: 123,
          year: 2017,
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },

          ],
          visualTokenBackground: '#f52524',
          textColor: '#DFDFDF',
        }
      });
    });
  });
  describe('networkOfficerSelector', function () {
    it('should return network officer correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkOfficers: [
              {
                'id': 123,
                'full_name': 'Jerome Finnigan',
                'appointed_date': '2001-07-08',
                'resignation_date': '2005-10-10',
                'badge': '123456',
                'gender': 'Male',
                'birth_year': 1970,
                'race': 'White',
                'rank': 'Police Officer',
                'unit': {
                  'id': 456,
                  'unit_name': 'Unit 715',
                  'description': 'This is unit description',
                },
                'allegation_count': 10,
                'sustained_count': 5,
                'civilian_compliment_count': 20,
                'discipline_count': 3,
                'trr_count': 7,
                'major_award_count': 15,
                'honorable_mention_count': 12,
                'percentile': {
                  'officer_id': 123,
                  'year': 2017,
                  'percentile_allegation': '95',
                  'percentile_trr': '90',
                  'percentile_allegation_civilian': '97.0',
                  'percentile_allegation_internal': '82.0',
                },
                'honorable_mention_percentile': '70'
              }
            ],
            officerId: 123
          }
        }
      };
      networkOfficerSelector(state).should.eql({
        id: 123,
        to: '/officer/123/jerome-finnigan/',
        fullName: 'Jerome Finnigan',
        appointedDate: 'JUL 8, 2001',
        resignationDate: 'OCT 10, 2005',
        badge: '123456',
        gender: 'Male',
        age: 47,
        race: 'White',
        rank: 'Police Officer',
        unit: {
          id: 456,
          unitName: 'Unit 715',
          description: 'This is unit description',
        },
        complaintCount: 10,
        civilianComplimentCount: 20,
        sustainedCount: 5,
        disciplineCount: 3,
        trrCount: 7,
        majorAwardCount: 15,
        honorableMentionCount: 12,
        honorableMentionPercentile: 70,
        trrPercentile: 90,
        complaintPercentile: 95,
        lastPercentile: {
          officerId: 123,
          year: 2017,
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },

          ],
          visualTokenBackground: '#f52524',
          textColor: '#DFDFDF',
        }
      });
    });
  });
});
