import { previewPaneTransform } from 'selectors/common/preview-pane-transforms';
import { RawOfficerSuggestion, RawRankSuggestion } from 'utils/test/factories/suggestion';

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
      'police_hq': '22nd',
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
        policeHQ: '22nd',
        isPinned: false,
      },
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
        to: '/search/?q=123456abcd&type=123456ABCD',
        url: '',
        type: 'SEARCH-TERMS',
        uniqueKey: 'SEARCH-TERMS-123456-abcd',
        isPinned: false,
      },
      type: 'SEARCH-TERMS',
    });
  });

  it('should transform OFFICER correctly', function () {
    const focusedSuggestion = RawOfficerSuggestion.build({
      id: '29033',
      name: undefined,
      race: 'White',
      gender: 'Male',
      'birth_year': 1969,
      to: '/officer/29033/',
      'allegation_count': 10,
      'sustained_count': 2,
      isPinned: true,
      'appointed_date': undefined,
      'resignation_date': undefined,
      unit: {
        id: 1,
        'unit_name': '018',
        description: 'District 018',
      },
    });
    focusedSuggestion.type = 'OFFICER';

    const expectedData = {
      id: 29033,
      fullName: 'Jerome Turbyville',
      age: '48-year-old',
      appointedDate: 'OCT 21, 2010',
      resignationDate: 'SEP 20, 2018',
      badge: '5922',
      complaintCount: 10,
      allegationPercentile: 93,
      civilianComplimentCount: 4,
      gender: 'Male',
      lastPercentile: {
        items: [
          { axis: 'Use of Force Reports', value: 90 },
          { axis: 'Officer Allegations', value: 91 },
          { axis: 'Civilian Allegations', value: 92 },
        ],
        visualTokenBackground: '#F52524',
        textColor: '#DFDFDF',
      },
      race: 'White',
      rank: 'Police Officer',
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
      isPinned: true,
    };

    previewPaneTransform({
      ...focusedSuggestion,
      'full_name': 'Jerome Turbyville',
      'appointed_date': '2010-10-21',
      'resignation_date': '2018-09-20',
    }).should.deepEqual({
      type: 'OFFICER',
      data: expectedData,
    });

    previewPaneTransform({
      ...focusedSuggestion,
      'name': 'Jerome Turbyville',
      'date_of_appt': '2010-10-21',
      'date_of_resignation': '2018-09-20',
      'race': 'Unknown',
      'gender': undefined,
      'birth_year': undefined,
    }).should.deepEqual({
      type: 'OFFICER',
      data: {
        ...expectedData,
        race: '',
        gender: '',
        age: '',
      },
    });
  });

  it('should transform OFFICER percentile correctly', function () {
    const focusedSuggestion = RawOfficerSuggestion.build({
      id: '29033',
      name: undefined,
      'full_name': 'Jerome Turbyville',
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

    previewPaneTransform({
      type: 'OFFICER',
      ...focusedSuggestion,
    }).should.deepEqual({
      data: {
        id: 29033,
        fullName: 'Jerome Turbyville',
        age: '48-year-old',
        appointedDate: 'DEC 13, 1999',
        badge: '5922',
        complaintCount: 10,
        allegationPercentile: 93,
        civilianComplimentCount: 4,
        gender: 'Male',
        lastPercentile: {
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 91 },
            { axis: 'Civilian Allegations', value: 92 },
          ],
          visualTokenBackground: '#F52524',
          textColor: '#DFDFDF',
        },
        race: 'White',
        rank: 'Police Officer',
        resignationDate: '',
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
        isPinned: false,
      },
      type: 'OFFICER',
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
        id: 29033,
        fullName: 'Jerome Turbyville',
        age: '48-year-old',
        appointedDate: 'DEC 13, 1999',
        badge: '5922',
        complaintCount: 10,
        allegationPercentile: 93,
        civilianComplimentCount: 4,
        gender: 'Male',
        lastPercentile: {
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 91 },
            { axis: 'Civilian Allegations', value: 92 },
          ],
          visualTokenBackground: '#F52524',
          textColor: '#DFDFDF',
        },
        race: 'White',
        rank: 'Police Officer',
        resignationDate: '',
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
        isPinned: false,
      },
      type: 'UNIT > OFFICERS',
    };
    previewPaneTransform({
      type: 'UNIT > OFFICERS',
      ...focusedSuggestion,
    }).should.deepEqual(info);
  });

  it('should transform RANK data correctly', function () {
    const focusedSuggestion = RawRankSuggestion.build({
      id: '29033',
      name: 'Chief',
      'active_officers_count': 11,
      'officers_most_complaints': [
        { id: 1, count: 2, name: 'Hulk' },
        { id: 2, count: 1, name: 'Peter Parker' },
      ],
    });
    const info = {
      data: {
        name: 'Chief',
        activeOfficersCount: 11,
        officersMostComplaints: [{
          'count': 2,
          'id': 1,
          'name': 'Hulk',
          'radarAxes': undefined,
          'radarColor': undefined,
          'url': '/officer/1/hulk/',
        }, {
          'count': 1,
          'id': 2,
          'name': 'Peter Parker',
          'radarAxes': undefined,
          'radarColor': undefined,
          'url': '/officer/2/peter-parker/',
        }],
        isPinned: false,
      },
      type: 'RANK',
    };
    previewPaneTransform({
      type: 'RANK',
      ...focusedSuggestion,
    }).should.deepEqual(info);
  });

  it('should transform TRR data correctly', function () {
    const focusedItem = {
      'id': '123456',
      'firearm_used': true,
      'trr_datetime': '2017-02-03',
      address: '14XX W 63RD ST, CHICAGO IL 60636',
      officer: {
        'id': 16567,
        'full_name': 'Baudilio Lopez',
        'percentile_trr': '72.1094',
        'percentile_allegation_civilian': '98.5549',
        'percentile_allegation_internal': '61.1521',
        'percentile_allegation': '99.9',
        'allegation_count': 93,
      },
      to: '/trr/123456/',
      'force_type': 'Verbal Commands',
    };

    const expectedData = {
      type: 'TRR',
      data: {
        subText: 'TRR # 123456 - February 3, 2017',
        category: 'Firearm',
        incidentDate: 'Feb 03, 2017',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        officer: {
          id: 16567,
          name: 'Baudilio Lopez',
          url: '/officer/16567/baudilio-lopez/',
          radarAxes: [
            { axis: 'Use of Force Reports', value: 72.1094 },
            { axis: 'Officer Allegations', value: 61.1521 },
            { axis: 'Civilian Allegations', value: 98.5549 },
          ],
          radarColor: '#F52524',
          count: 93,
        },
        to: '/trr/123456/',
        isPinned: false,
        forceType: 'Verbal Commands',
      },
    };

    previewPaneTransform({
      type: 'TRR',
      ...focusedItem,
    }).should.deepEqual(expectedData);
  });

  it('should transform lawsuit data correctly', function () {
    const focusedItem = {
      type: 'LAWSUIT',
      id: 25,
      to: '/lawsuit/00-L-5230/',
      'case_no': '00-L-5230',
      'primary_cause': 'Excessive force',
      'summary': 'Lawsuit summary',
      'incident_date': '2016-09-11',
      'address': '',
      'location': 'near intersection of N Waveland and Sheffield',
      'plaintiffs': [{ 'name': 'Arthur Hutchinson' }],
      'officers': [{
        'percentile_allegation': '30.9271',
        'percentile_trr': '0.0000',
        'percentile_allegation_civilian': '29.1229',
        'percentile_allegation_internal': '77.7431',
        'id': 19002,
        'full_name': 'Richard Mierniczak',
        'allegation_count': 6,
      }],
      'total_payments': '60000.00',
    };

    const expectedData = {
      type: 'LAWSUIT',
      data: {
        isPinned: false,
        to: '/lawsuit/00-L-5230/',
        summary: 'Lawsuit summary',
        totalPaymentsDisplay: '60.0K',
        location: 'near intersection of N Waveland and Sheffield',
        officers: [
          {
            'count': 6,
            'id': 19002,
            'name': 'Richard Mierniczak',
            'radarAxes': [
              {
                'axis': 'Use of Force Reports',
                'value': 0,
              },
              {
                'axis': 'Officer Allegations',
                'value': 77.7431,
              },
              {
                'axis': 'Civilian Allegations',
                'value': 29.1229,
              },
            ],
            'radarColor': '#F4A298',
            'url': '/officer/19002/richard-mierniczak/',
          },
        ],
        plaintiffs: [
          {
            name: 'Arthur Hutchinson',
          },
        ],
        primaryCause: 'Excessive force',
        incidentDate: '2016-09-11',
        address: '',
        caseNo: '00-L-5230',
      },
    };

    previewPaneTransform({
      type: 'LAWSUIT',
      ...focusedItem,
    }).should.deepEqual(expectedData);
  });
});
