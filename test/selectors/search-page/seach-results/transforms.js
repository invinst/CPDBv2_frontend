import { previewPaneTransform, searchResultItemTransform } from 'selectors/search-page/search-results/transforms';
import { RawOfficerSuggestion, RawRankSuggestion } from 'utils/test/factories/suggestion';


describe('search page transforms', function () {
  describe('searchResultTransform', function () {
    it('should transform cr data correctly', function () {
      searchResultItemTransform({
        type: 'CR',
        id: 1,
        isPinned: true,
        crid: 123,
        to: '/complaint/123/',
        'incident_date': '2012-07-02',
        highlight: {
          summary: ['the officer pointed a gun at the victim']
        },
        category: 'Use Of Force',
        'sub_category': 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        'victims': [
          { 'gender': 'Female', 'race': 'Hispanic' },
          { 'gender': 'Female', 'race': 'Hispanic', 'age': 48 }
        ],
        'coaccused': [
          {
            'id': 16567,
            'full_name': 'Baudilio Lopez',
            'percentile': {
              'id': 180838,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521'
            },
            'allegation_count': 93
          },
          {
            'id': 7544,
            'full_name': 'Dominique Dunigan',
            'percentile': {
              'id': 180839,
              'percentile_trr': '0.0000',
              'percentile_allegation_civilian': '24.1180',
              'percentile_allegation_internal': '0.0000'
            },
            'allegation_count': 1
          }
        ]
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: true,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
        text: 'CR # 123 - July 2, 2012',
        subText: 'the officer pointed a gun at the victim',
        recentText: 'CR # 123 - July 2, 2012',
        incidentDate: 'JUL 2, 2012',
        category: 'Use Of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
        coaccused: [{
          id: 16567,
          name: 'Baudilio Lopez',
          url: '/officer/16567/baudilio-lopez/',
          radarAxes: [
            { axis: 'Use of Force Reports', value: 72.1094 },
            { axis: 'Officer Allegations', value: 61.1521 },
            { axis: 'Civilian Allegations', value: 98.5549 }
          ],
          radarColor: '#f0201e',
          count: 93
        }, {
          id: 7544,
          name: 'Dominique Dunigan',
          url: '/officer/7544/dominique-dunigan/',
          radarAxes: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Officer Allegations', value: 0 },
            { axis: 'Civilian Allegations', value: 24.118 }
          ],
          radarColor: '#f5c5a2',
          count: 1
        }],
      });
    });

    it('should transform cr with no highlight', function () {
      searchResultItemTransform({
        type: 'CR',
        id: 1,
        isPinned: false,
        crid: 123,
        to: '/complaint/123/',
        'incident_date': '2012-07-02',
        category: 'Use Of Force',
        'sub_category': 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        'victims': [],
        'coaccused': []
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: false,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
        text: 'CR # 123 - July 2, 2012',
        subText: '',
        recentText: 'CR # 123 - July 2, 2012',
        incidentDate: 'JUL 2, 2012',
        category: 'Use Of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: [],
        coaccused: [],
      });
    });

    it('should transform cr with text content highlight', function () {
      searchResultItemTransform({
        type: 'CR',
        id: 1,
        isPinned: false,
        crid: 123,
        to: '/complaint/123/',
        'incident_date': '2012-07-02',
        category: 'Use Of Force',
        'sub_category': 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        'victims': [],
        'coaccused': [],
        highlight: {
          'text_content': ['first text orc match', 'second orc text match'],
        }
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: false,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
        text: 'CR # 123 - July 2, 2012',
        subText: 'first text orc match',
        recentText: 'CR # 123 - July 2, 2012',
        incidentDate: 'JUL 2, 2012',
        category: 'Use Of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: [],
        coaccused: [],
      });
    });

    it('should transform cr with summary and text content highlight', function () {
      searchResultItemTransform({
        type: 'CR',
        id: 1,
        isPinned: false,
        crid: 123,
        to: '/complaint/123/',
        'incident_date': '2012-07-02',
        category: 'Use Of Force',
        'sub_category': 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        'victims': [],
        'coaccused': [],
        highlight: {
          summary: ['the officer pointed a gun at the victim', 'second match'],
          'text_content': ['first text orc match', 'second orc text match'],
        }
      }).should.deepEqual({
        type: 'CR',
        id: 1,
        isPinned: false,
        to: '/complaint/123/',
        url: undefined,
        uniqueKey: 'CR-1',
        tags: [],
        itemIndex: 1,
        text: 'CR # 123 - July 2, 2012',
        subText: 'the officer pointed a gun at the victim',
        recentText: 'CR # 123 - July 2, 2012',
        incidentDate: 'JUL 2, 2012',
        category: 'Use Of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: [],
        coaccused: [],
      });
    });

    it('should transform search term data correctly', function () {
      searchResultItemTransform({
        type: 'SEARCH-TERMS',
        id: '1234abcd',
        isPinned: false,
        name: 'Communities',
        description: 'This is community description',
        'category_name': 'Geography',
        'call_to_action_type': 'view_all',
      }).should.deepEqual({
        type: 'SEARCH-TERMS',
        id: '1234abcd',
        isPinned: false,
        to: '/search/?terms=1234abcd&type=1234ABCD',
        url: '',
        uniqueKey: 'SEARCH-TERMS-1234-abcd',
        name: 'Communities',
        tags: [],
        itemIndex: 1,
        description: 'This is community description',
        callToActionType: 'view_all',
        text: 'Geography - Communities',
        recentText: 'Geography - Communities',
      });
    });
  });

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

    it('should transform SEARCH-TERMS data correctly', function () {
      previewPaneTransform({
        type: 'SEARCH-TERMS',
        name: 'Communities',
        description: 'This is community description',
        id: '123456abcd',
        'call_to_action_type': 'view_all',
        link: '/url-mediator/session-builder?community=<name>',
      }).should.deepEqual({
        data: {
          id: '123456abcd',
          name: 'Communities',
          description: 'This is community description',
          callToActionType: 'view_all',
          to: '/search/?terms=123456abcd&type=123456ABCD',
          url: '',
          type: 'SEARCH-TERMS',
          uniqueKey: 'SEARCH-TERMS-123456-abcd'
        },
        type: 'SEARCH-TERMS'
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
