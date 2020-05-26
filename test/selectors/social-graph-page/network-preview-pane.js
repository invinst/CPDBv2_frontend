import should from 'should';

import {
  officerDetailTransform,
  accusedTransform,
  networkAllegationTransform,
  networkOfficerSelector,
  edgeOfficersSelector,
  getNetworkAllegation,
  networkAllegationSelector,
  getNetworkPreviewPaneData,
} from 'selectors/social-graph-page/network-preview-pane';
import { NETWORK_PREVIEW_PANE } from 'utils/constants';


describe('Social Graph preview pane selectors', function () {
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
        'percentile_allegation': '95.0000',
        'percentile_trr': '90.0000',
        'percentile_allegation_civilian': '97.0000',
        'percentile_allegation_internal': '82.0000',
        'honorable_mention_percentile': '70.0000',
      };
      officerDetailTransform(officer).should.eql({
        id: 123,
        to: '/officer/123/jerome-finnigan/',
        fullName: 'Jerome Finnigan',
        appointedDate: 'JUL 8, 2001',
        resignationDate: 'OCT 10, 2005',
        badge: '123456',
        gender: 'Male',
        age: '47-year-old',
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
        allegationPercentile: 95,
        lastPercentile: {
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },

          ],
          visualTokenBackground: '#F52524',
          textColor: '#DFDFDF',
        },
      });
    });
  });

  describe('accusedTransform', function () {
    it('should return accused officer correctly', function () {
      const coaccused = {
        'id': 21992,
        'rank': 'Police Officer',
        'full_name': 'Johnny Patterson',
        'coaccusal_count': 24,
        'allegation_count': 42,
        'percentile_trr': '0.0000',
        'percentile_allegation': '88.9038',
        'percentile_allegation_civilian': '49.4652',
        'percentile_allegation_internal': '85.8654',
      };
      accusedTransform(coaccused).should.eql({
        id: 21992,
        name: 'Johnny Patterson',
        url: '/officer/21992/johnny-patterson/',
        count: 42,
        radarAxes: [
          {
            'axis': 'Use of Force Reports',
            'value': 0,
          },
          {
            'axis': 'Officer Allegations',
            'value': 85.8654,
          },
          {
            'axis': 'Civilian Allegations',
            'value': 49.4652,
          },
        ],
        radarColor: '#FF412C',
      });
    });
  });

  describe('networkAllegationTransform', function () {
    it('should return network allegation correctly', function () {
      const networkCRDatum = {
        'crid': '123456',
        'incident_date': '2007-10-10',
        'address': '3510 Michigan Ave, Chicago, IL 60653',
        'category': 'Use of Force',
        'subcategory': 'Illegal Arrest / False Arrest',
        'attachments': [],
        'to': '/complaint/123456/',
        'victims': [
          {
            'gender': 'Male',
            'race': 'Black',
          },
          {
            'gender': 'Male',
            'race': 'White',
          },
          {
            'gender': '',
            'race': '',
          },
        ],
        'coaccused': [
          {
            'id': 21992,
            'rank': 'Police Officer',
            'full_name': 'Johnny Patterson',
            'coaccusal_count': 24,
            'allegation_count': 42,
            'percentile_trr': '0.0000',
            'percentile_allegation': '88.9038',
            'percentile_allegation_civilian': '49.4652',
            'percentile_allegation_internal': '85.8654',
          },
        ],
      };
      networkAllegationTransform(networkCRDatum).should.eql({
        category: 'Use of Force',
        subCategory: 'Illegal Arrest / False Arrest',
        incidentDate: 'OCT 10, 2007',
        address: '3510 Michigan Ave, Chicago, IL 60653',
        to: '/complaint/123456/',
        victims: ['Black, Male', 'White, Male'],
        coaccused: [
          {
            id: 21992,
            name: 'Johnny Patterson',
            url: '/officer/21992/johnny-patterson/',
            count: 42,
            radarAxes: [
              {
                'axis': 'Use of Force Reports',
                'value': 0,
              },
              {
                'axis': 'Officer Allegations',
                'value': 85.8654,
              },
              {
                'axis': 'Civilian Allegations',
                'value': 49.4652,
              },
            ],
            radarColor: '#FF412C',
          },
        ],
      });
    });
  });

  describe('getNetworkAllegation', function () {
    it('should return network allegation if there is selectedCrid', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkAllegations: [
              {
                category: 'Criminal Misconduct',
                subcategory: 'Theft',
                crid: '260131',
                'incident_date': '2003-02-17',
                'officer_ids': [123],
              },
              {
                category: 'Illegal Search',
                subcategory: 'Search Of Premise Without Warrant',
                crid: '294088',
                'incident_date': '2003-11-26',
                attachments: [
                  {
                    url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
                    'preview_image_url':
                      'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
                    title: 'CRID 294088 CR',
                    'file_type': 'document',
                    'id': '123456',
                  },
                ],
                'officer_ids': [123, 456, 789],
              },
            ],
            graphData: {
              'list_event': ['2003-02-17', '2003-11-26'],
            },
            selectedCrid: '260131',
          },
        },
      };
      getNetworkAllegation(state).should.eql({
        category: 'Criminal Misconduct',
        subcategory: 'Theft',
        crid: '260131',
        'incident_date': '2003-02-17',
        'officer_ids': [123],
      });
    });
  });

  describe('networkAllegationSelector', function () {
    it('should return allegation correctly if there is selectedCrid', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkAllegations: [
              {
                'crid': '123456',
                'incident_date': '2007-10-10',
                'address': '3510 Michigan Ave, Chicago, IL 60653',
                'category': 'Use of Force',
                'subcategory': 'Illegal Arrest / False Arrest',
                'attachments': [],
                'to': '/complaint/123456/',
                'victims': [
                  {
                    'gender': 'Male',
                    'race': 'Black',
                  },
                  {
                    'gender': 'Male',
                    'race': 'White',
                  },
                ],
                'coaccused': [
                  {
                    'id': 21992,
                    'rank': 'Police Officer',
                    'full_name': 'Johnny Patterson',
                    'coaccusal_count': 24,
                    'allegation_count': 42,
                    'percentile_trr': '0.0000',
                    'percentile_allegation': '88.9038',
                    'percentile_allegation_civilian': '49.4652',
                    'percentile_allegation_internal': '85.8654',
                  },
                ],
              },
              {
                category: 'Illegal Search',
                subcategory: 'Search Of Premise Without Warrant',
                crid: '294088',
                'incident_date': '2003-11-26',
                attachments: [
                  {
                    url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
                    'preview_image_url':
                      'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
                    title: 'CRID 294088 CR',
                    'file_type': 'document',
                    'id': '123456',
                  },
                ],
                'officer_ids': [123, 456, 789],
              },
            ],
            graphData: {
              'list_event': ['2003-02-17', '2003-11-26'],
            },
            selectedCrid: '123456',
          },
        },
      };
      networkAllegationSelector(state).should.eql({
        category: 'Use of Force',
        subCategory: 'Illegal Arrest / False Arrest',
        incidentDate: 'OCT 10, 2007',
        address: '3510 Michigan Ave, Chicago, IL 60653',
        to: '/complaint/123456/',
        victims: ['Black, Male', 'White, Male'],
        coaccused: [
          {
            id: 21992,
            name: 'Johnny Patterson',
            url: '/officer/21992/johnny-patterson/',
            count: 42,
            radarAxes: [
              {
                'axis': 'Use of Force Reports',
                'value': 0,
              },
              {
                'axis': 'Officer Allegations',
                'value': 85.8654,
              },
              {
                'axis': 'Civilian Allegations',
                'value': 49.4652,
              },
            ],
            radarColor: '#FF412C',
          },
        ],
      });
    });

    it('should return undefined if getNetworkAllegation return null', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkAllegations: [
              {
                'crid': '123456',
                'incident_date': '2007-10-10',
                'address': '3510 Michigan Ave, Chicago, IL 60653',
                'category': 'Use of Force',
                'subcategory': 'Illegal Arrest / False Arrest',
                'attachments': [],
                'to': '/complaint/123456/',
                'victims': [
                  {
                    'gender': 'Male',
                    'race': 'Black',
                  },
                  {
                    'gender': 'Male',
                    'race': 'White',
                  },
                ],
                'coaccused': [
                  {
                    'id': 21992,
                    'rank': 'Police Officer',
                    'full_name': 'Johnny Patterson',
                    'coaccusal_count': 24,
                    'allegation_count': 42,
                    'percentile_trr': '0.0000',
                    'percentile_allegation': '88.9038',
                    'percentile_allegation_civilian': '49.4652',
                    'percentile_allegation_internal': '85.8654',
                  },
                ],
              },
              {
                category: 'Illegal Search',
                subcategory: 'Search Of Premise Without Warrant',
                crid: '294088',
                'incident_date': '2003-11-26',
                attachments: [
                  {
                    url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
                    'preview_image_url':
                      'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
                    title: 'CRID 294088 CR',
                    'file_type': 'document',
                    'id': '123456',
                  },
                ],
                'officer_ids': [123, 456, 789],
              },
            ],
            graphData: {
              'list_event': ['2003-02-17', '2003-11-26'],
            },
            selectedCrid: '654321',
          },
        },
      };
      should(networkAllegationSelector(state)).be.undefined();
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
                'percentile_allegation': '95',
                'percentile_trr': '90',
                'percentile_allegation_civilian': '97.0',
                'percentile_allegation_internal': '82.0',
                'honorable_mention_percentile': '70',
              },
            ],
            selectedOfficerId: 123,
          },
        },
      };
      networkOfficerSelector(state).should.eql({
        id: 123,
        to: '/officer/123/jerome-finnigan/',
        fullName: 'Jerome Finnigan',
        appointedDate: 'JUL 8, 2001',
        resignationDate: 'OCT 10, 2005',
        badge: '123456',
        gender: 'Male',
        age: '47-year-old',
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
        allegationPercentile: 95,
        lastPercentile: {
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },

          ],
          visualTokenBackground: '#F52524',
          textColor: '#DFDFDF',
        },
      });
    });
  });

  describe('edgeOfficersSelector', function () {
    it('should return edge officers data correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            graphData: {
              'coaccused_data': [
                {
                  'officer_id_1': 1,
                  'officer_id_2': 2,
                  'incident_date': '1988-10-03',
                  'accussed_count': 1,
                },
                {
                  'officer_id_1': 3,
                  'officer_id_2': 4,
                  'incident_date': '1990-10-03',
                  'accussed_count': 5,
                },
                {
                  'officer_id_1': 3,
                  'officer_id_2': 4,
                  'incident_date': '1991-10-03',
                  'accussed_count': 6,
                },
              ],
              officers: [
                {
                  'full_name': 'Jerome Finnigan',
                  'id': 3,
                  'percentile_trr': '78.2707',
                  'percentile_allegation_civilian': '97.8772',
                  'percentile_allegation_internal': '61.1521',
                },
                {
                  'full_name': 'Edward May',
                  'id': 4,
                  'percentile_trr': '80',
                  'percentile_allegation_civilian': '85',
                  'percentile_allegation_internal': '90',
                },
              ],
            },
            selectedEdge: {
              sourceUid: 3,
              targetUid: 4,
            },
          },
        },
      };
      edgeOfficersSelector(state).should.eql({
        sourceOfficerName: 'Jerome Finnigan',
        targetOfficerName: 'Edward May',
      });
    });
  });

  describe('getNetworkPreviewPaneData', function () {
    it('should return network officer data correctly', function () {
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
                'percentile_allegation': '95',
                'percentile_trr': '90',
                'percentile_allegation_civilian': '97.0',
                'percentile_allegation_internal': '82.0',
                'honorable_mention_percentile': '70',
              },
            ],
            graphData: {
              'list_event': ['2003-02-17', '2003-11-26'],
            },
            selectedOfficerId: 123,
          },
        },
      };
      getNetworkPreviewPaneData(state).should.eql({
        type: NETWORK_PREVIEW_PANE.OFFICER,
        data: {
          id: 123,
          to: '/officer/123/jerome-finnigan/',
          fullName: 'Jerome Finnigan',
          appointedDate: 'JUL 8, 2001',
          resignationDate: 'OCT 10, 2005',
          badge: '123456',
          gender: 'Male',
          age: '47-year-old',
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
          allegationPercentile: 95,
          lastPercentile: {
            items: [
              { axis: 'Use of Force Reports', value: 90 },
              { axis: 'Officer Allegations', value: 82 },
              { axis: 'Civilian Allegations', value: 97 },
            ],
            visualTokenBackground: '#F52524',
            textColor: '#DFDFDF',
          },
        },
      });
    });

    it('should return edge coaccusals data correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkAllegations: [
              {
                category: 'Criminal Misconduct',
                subcategory: 'Theft',
                crid: '260131',
                'incident_date': '2003-02-17',
                'officer_ids': [123],
              },
              {
                category: 'Illegal Search',
                subcategory: 'Search Of Premise Without Warrant',
                crid: '294088',
                'incident_date': '2003-11-26',
                attachments: [
                  {
                    url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
                    'preview_image_url':
                      'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088.gif',
                    title: 'CRID 294088 CR',
                    'file_type': 'document',
                    'id': '123456',
                  },
                ],
                'officer_ids': [123, 456, 789],
              },
            ],
            graphData: {
              'coaccused_data': [
                {
                  'officer_id_1': 1,
                  'officer_id_2': 2,
                  'incident_date': '1988-10-03',
                  'accussed_count': 1,
                },
                {
                  'officer_id_1': 123,
                  'officer_id_2': 456,
                  'incident_date': '1990-10-03',
                  'accussed_count': 5,
                },
                {
                  'officer_id_1': 123,
                  'officer_id_2': 456,
                  'incident_date': '1991-10-03',
                  'accussed_count': 6,
                },
              ],
              officers: [
                {
                  'full_name': 'Jerome Finnigan',
                  'id': 123,
                  'percentile_trr': '78.2707',
                  'percentile_allegation_civilian': '97.8772',
                  'percentile_allegation_internal': '61.1521',
                },
                {
                  'full_name': 'Edward May',
                  'id': 456,
                  'percentile_trr': '80',
                  'percentile_allegation_civilian': '85',
                  'percentile_allegation_internal': '90',
                },
              ],
              'list_event': ['2003-02-17', '2003-11-26'],
            },
            selectedEdge: {
              sourceUid: 123,
              targetUid: 456,
            },
          },
        },
      };
      getNetworkPreviewPaneData(state).should.eql({
        type: NETWORK_PREVIEW_PANE.EDGE_COACCUSALS,
        data: {
          items: [
            {
              date: 2003,
              hasData: true,
              key: '294088-YEAR-2003',
              kind: 'YEAR',
            },
            {
              category: 'Illegal Search',
              crid: '294088',
              incidentDate: 'NOV 26',
              key: '294088',
              kind: 'CR',
              subcategory: 'Search Of Premise Without Warrant',
              year: 2003,
              attachments: [
                {
                  fileType: 'document',
                  id: '123456',
                  previewImageUrl: 'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088.gif',
                  title: 'CRID 294088 CR',
                  url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
                },
              ],
              timelineIdx: undefined,
            },
          ],
          info: {
            sourceOfficerName: 'Jerome Finnigan',
            targetOfficerName: 'Edward May',
            coaccusedCount: 1,
          },
        },
      });
    });

    it('should return network allegation data correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkAllegations: [
              {
                'crid': '123456',
                'incident_date': '2007-10-10',
                'address': '3510 Michigan Ave, Chicago, IL 60653',
                'category': 'Use of Force',
                'subcategory': 'Illegal Arrest / False Arrest',
                'attachments': [],
                'to': '/complaint/123456/',
                'victims': [
                  {
                    'gender': 'Male',
                    'race': 'Black',
                  },
                  {
                    'gender': 'Male',
                    'race': 'White',
                  },
                ],
                'coaccused': [
                  {
                    'id': 21992,
                    'rank': 'Police Officer',
                    'full_name': 'Johnny Patterson',
                    'coaccusal_count': 24,
                    'allegation_count': 42,
                    'percentile_trr': '0.0000',
                    'percentile_allegation': '88.9038',
                    'percentile_allegation_civilian': '49.4652',
                    'percentile_allegation_internal': '85.8654',
                  },
                ],
              },
              {
                category: 'Illegal Search',
                subcategory: 'Search Of Premise Without Warrant',
                crid: '294088',
                'incident_date': '2003-11-26',
                attachments: [
                  {
                    url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
                    'preview_image_url':
                      'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
                    title: 'CRID 294088 CR',
                    'file_type': 'document',
                    'id': '123456',
                  },
                ],
                'officer_ids': [123, 456, 789],
              },
            ],
            graphData: {
              'list_event': ['2003-02-17', '2003-11-26'],
            },
            selectedCrid: '123456',
            selectedEdge: {
              sourceUid: 123,
              targetUid: 456,
            },
          },
        },
      };
      getNetworkPreviewPaneData(state).should.eql({
        type: NETWORK_PREVIEW_PANE.CR,
        data: {
          category: 'Use of Force',
          subCategory: 'Illegal Arrest / False Arrest',
          incidentDate: 'OCT 10, 2007',
          address: '3510 Michigan Ave, Chicago, IL 60653',
          to: '/complaint/123456/',
          victims: ['Black, Male', 'White, Male'],
          coaccused: [
            {
              id: 21992,
              name: 'Johnny Patterson',
              url: '/officer/21992/johnny-patterson/',
              count: 42,
              radarAxes: [
                {
                  'axis': 'Use of Force Reports',
                  'value': 0,
                },
                {
                  'axis': 'Officer Allegations',
                  'value': 85.8654,
                },
                {
                  'axis': 'Civilian Allegations',
                  'value': 49.4652,
                },
              ],
              radarColor: '#FF412C',
            },
          ],
        },
      });
    });
  });
});
