import { focusedItemSelector } from 'selectors/pinboard-page/focused-item';
import { RawOfficerSuggestion } from 'utils/test/factories/suggestion';


describe('focusedItem selectors', function () {
  it('should return correct status', function () {
    const officerItem = RawOfficerSuggestion.build({
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
      isPinned: true,
    });
    const state = {
      pinboardPage: {
        focusedItem: {
          id: '29033',
          type: 'OFFICER',
        },
        officerItems: {
          requesting: false,
          items: [
            officerItem,
          ],
        },
        crItems: {
          requesting: false,
          items: [{
            crid: '1000001',
            'incident_date': '2010-01-01',
            point: { 'lon': 1.0, 'lat': 1.0 },
            'most_common_category': 'Use Of Force',
          }],
        },
        trrItems: {
          requesting: false,
          items: [{
            id: 1,
            'trr_datetime': '2012-01-01',
            category: 'Impact Weapon',
            point: { 'lon': 1.0, 'lat': 1.0 },
          }],
        },
        relevantComplaints: {
          items: [],
        },
        relevantCoaccusals: {
          items: [],
        },
        relevantDocuments: [],
      },
    };

    focusedItemSelector(state).should.be.eql({
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
        isPinned: true,
      },
      type: 'OFFICER',
    });
  });

  it('should return allegation from relevant documents', function () {
    const officerItem = RawOfficerSuggestion.build({
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
      isPinned: true,
    });
    const state = {
      pinboardPage: {
        focusedItem: {
          id: '1073132',
          type: 'CR',
        },
        officerItems: {
          requesting: false,
          items: [
            officerItem,
          ],
        },
        crItems: {
          requesting: false,
          items: [{
            crid: '1000001',
            'incident_date': '2010-01-01',
            point: { 'lon': 1.0, 'lat': 1.0 },
            'most_common_category': 'Use Of Force',
          }],
        },
        trrItems: {
          requesting: false,
          items: [{
            id: 1,
            'trr_datetime': '2012-01-01',
            category: 'Impact Weapon',
            point: { 'lon': 1.0, 'lat': 1.0 },
          }],
        },
        relevantComplaints: {
          items: [],
        },
        relevantCoaccusals: {
          items: [],
        },
        relevantDocuments: {
          items: [
            {
              'id': 4924,
              'preview_image_url': 'https://assets.documentcloud.org/documents/4769280/pages/CRID-1073132.gif',
              'url': 'https://assets.documentcloud.org/documents/4769280/CRID-1073132-CR.pdf',
              'allegation': {
                'crid': '1073132',
                'address': '31XX West HARRISON ST, CHICAGO ILLINOIS 60612',
                'category': 'Use Of Force',
                'incident_date': '2014-12-28',
                'victims': [
                  {
                    'gender': 'Female',
                    'race': 'Black',
                  },
                  {
                    'gender': 'Female',
                    'race': 'Black',
                  },
                ],
                'point': {
                  'lon': -87.7053303,
                  'lat': 41.8734621,
                },
                'to': '/complaint/1073132/',
                'sub_category': 'Miscellaneous',
                'coaccused': [
                  {
                    'id': 7771,
                    'rank': 'Police Officer',
                    'full_name': 'Darryl Edwards',
                    'allegation_count': 33,
                    'percentile_allegation': '97.6501',
                    'percentile_allegation_civilian': '96.9255',
                    'percentile_allegation_internal': '95.2661',
                    'percentile_trr': '91.2913',
                  },
                ],
              },
            },
          ],
        },
      },
    };

    focusedItemSelector(state).should.be.eql({
      data: {
        address: '31XX West HARRISON ST, CHICAGO ILLINOIS 60612',
        category: 'Use Of Force',
        coaccused: [
          {
            count: 33,
            id: 7771,
            name: 'Darryl Edwards',
            radarAxes: [
              {
                axis: 'Use of Force Reports',
                value: 91.2913,
              },
              {
                axis: 'Officer Allegations',
                value: 95.2661,
              },
              {
                axis: 'Civilian Allegations',
                value: 96.9255,
              },
            ],
            radarColor: '#F52524',
            url: '/officer/7771/darryl-edwards/',
          },
        ],
        incidentDate: 'Dec 28, 2014',
        isPinned: false,
        subCategory: 'Miscellaneous',
        subText: '',
        to: '/complaint/1073132/',
        victims: [
          'Black, Female',
          'Black, Female',
        ],
      },
      type: 'CR',
    });
  });
});
