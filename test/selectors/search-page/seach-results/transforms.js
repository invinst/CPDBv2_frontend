import { previewPaneTransform } from 'selectors/search-page/search-results/transforms';
import { RawOfficerSuggestion, RawRankSuggestion } from 'utils/test/factories/suggestion';


describe('search page transforms', function () {
  describe('previewPaneTransform', function () {
    it('should transform area data correctly', function () {
      previewPaneTransform({
        type: 'WARD',
        name: '01',
        'allegation_count': 1,
        'most_common_complaint': 'False Arrest',
        'race_count': [{ count: 1234, race: 'Black' }],
        'median_income': 123,
        'url': 'http://abc',
        'allegation_percentile': 99.9,
        alderman: 'John Wick',
        commander: {
          id: 123,
          'full_name': 'John Watts',
          'allegation_count': 10,
        },
        'police_hq': '22nd'
      }).should.deepEqual({
        type: 'WARD',
        data: {
          name: '01',
          allegationCount: 1,
          mostCommonComplaint: 'False Arrest',
          officersMostComplaint: [],
          population: '1,234',
          medianIncome: 123,
          url: 'http://abc',
          allegationPercentile: 99.9,
          raceCount: [{ race: 'Black', count: '100.0%' }],
          alderman: 'John Wick',
          districtCommander: {
            id: 123,
            name: 'John Watts',
            count: 10,
            url: '/officer/123/john-watts/',
          },
          policeHQ: '22nd'
        }
      });
    });

    it('should transform UNIT > OFFICERS data correctly', function () {
      const focusedSuggestion = RawOfficerSuggestion.build({
        id: '29033',
        name: 'Jerome Turbyville',
        race: 'White',
        sex: 'Male',
        'birth_year': 1969,
        to: '/officer/29033/',
        'allegation_count': 10,
        'sustained_count': 2,
        unit: {
          id: 1,
          'unit_name': '018',
          description: 'District 018',
        },
      });
      const info = {
        data: {
          fullName: 'Jerome Turbyville',
          age: 48,
          appointedDate: 'DEC 13, 1999',
          badge: '5922',
          complaintCount: 10,
          complaintPercentile: 93,
          civilianComplimentCount: 4,
          gender: 'Male',
          lastPercentile: {
            officerId: undefined,
            year: undefined,
            items: [
              { axis: 'Use of Force Reports', value: 90 },
              { axis: 'Officer Allegations', value: 91 },
              { axis: 'Civilian Allegations', value: 92 }
            ],
            visualTokenBackground: '#f52524',
            textColor: '#DFDFDF'
          },
          race: 'White',
          rank: 'Police Officer',
          resignationDate: null,
          sustainedCount: 2,
          disciplineCount: 1,
          honorableMentionCount: 0,
          majorAwardCount: 0,
          honorableMentionPercentile: 10,
          unit: {
            id: 1,
            unitName: '018',
            description: 'District 018',
          },
          trrCount: undefined,
          trrPercentile: 90,
          to: '/officer/29033/',
        },
        type: 'UNIT > OFFICERS',
      };
      previewPaneTransform({
        type: 'UNIT > OFFICERS',
        ...focusedSuggestion
      }).should.deepEqual(info);
    });

    it('should transform RANK data correctly', function () {
      const focusedSuggestion = RawRankSuggestion.build({
        id: '29033',
        name: 'Chief',
        'active_officers_count': 11,
        'officers_most_complaints': [
          { id: 1, count: 2, name: 'Hulk' },
          { id: 2, count: 1, name: 'Peter Parker' }
        ]
      });
      const info = {
        data: {
          name: 'Chief',
          activeOfficersCount: 11,
          officersMostComplaints: [{
            'count': 2,
            'id': 1,
            'name': 'Hulk',
            'radarAxes': [
              { 'axis': 'Use of Force Reports', 'value': NaN },
              { 'axis': 'Officer Allegations', 'value': NaN },
              { 'axis': 'Civilian Allegations', 'value': NaN }
            ],
            'radarColor': undefined,
            'url': '/officer/1/hulk/',
          }, {
            'count': 1,
            'id': 2,
            'name': 'Peter Parker',
            'radarAxes': [
              { 'axis': 'Use of Force Reports', 'value': NaN },
              { 'axis': 'Officer Allegations', 'value': NaN },
              { 'axis': 'Civilian Allegations', 'value': NaN }
            ],
            'radarColor': undefined,
            'url': '/officer/2/peter-parker/'
          }]
        },
        type: 'RANK',
      };
      previewPaneTransform({
        type: 'RANK',
        ...focusedSuggestion
      }).should.deepEqual(info);
    });
  });
});
