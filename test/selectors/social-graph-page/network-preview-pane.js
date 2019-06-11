import {
  officerDetailTransform,
  networkOfficerSelector,
  edgeOfficersSelector,
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
        'percentile': {
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
                  'year': 2017,
                  'percentile_allegation': '95',
                  'percentile_trr': '90',
                  'percentile_allegation_civilian': '97.0',
                  'percentile_allegation_internal': '82.0',
                },
                'honorable_mention_percentile': '70'
              }
            ],
            selectedOfficerId: 123
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
                }
              ],
              officers: [
                {
                  'full_name': 'Jerome Finnigan',
                  'id': 3,
                  'percentile': {
                    'percentile_trr': '78.2707',
                    'percentile_allegation_civilian': '97.8772',
                    'percentile_allegation_internal': '61.1521'
                  },
                },
                {
                  'full_name': 'Edward May',
                  'id': 4,
                  'percentile': {
                    'percentile_trr': '80',
                    'percentile_allegation_civilian': '85',
                    'percentile_allegation_internal': '90'
                  },
                }
              ]
            },
            selectedEdge: {
              sourceUid: 3,
              targetUid: 4,
            }
          }
        }
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
                'percentile': {
                  'year': 2017,
                  'percentile_allegation': '95',
                  'percentile_trr': '90',
                  'percentile_allegation_civilian': '97.0',
                  'percentile_allegation_internal': '82.0',
                },
                'honorable_mention_percentile': '70'
              }
            ],
            graphData: {
              'list_event': ['2003-02-17', '2003-11-26']
            },
            selectedOfficerId: 123
          }
        }
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
            year: 2017,
            items: [
              { axis: 'Use of Force Reports', value: 90 },
              { axis: 'Officer Allegations', value: 82 },
              { axis: 'Civilian Allegations', value: 97 },

            ],
            visualTokenBackground: '#f52524',
            textColor: '#DFDFDF',
          }
        },
      });
    });

    it('should return edge coaccusals data correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkAllegations: [
              {
                'most_common_category': {
                  category: 'Criminal Misconduct',
                  'allegation_name': 'Theft'
                },
                crid: '260131',
                'incident_date': '2003-02-17',
                'officer_ids': [123],
              },
              {
                'most_common_category': {
                  category: 'Illegal Search',
                  'allegation_name': 'Search Of Premise Without Warrant'
                },
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
                  }
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
                  'percentile': {
                    'percentile_trr': '78.2707',
                    'percentile_allegation_civilian': '97.8772',
                    'percentile_allegation_internal': '61.1521'
                  },
                },
                {
                  'full_name': 'Edward May',
                  'id': 456,
                  'percentile': {
                    'percentile_trr': '80',
                    'percentile_allegation_civilian': '85',
                    'percentile_allegation_internal': '90'
                  },
                }
              ],
              'list_event': ['2003-02-17', '2003-11-26'],
            },
            selectedEdge: {
              sourceUid: 123,
              targetUid: 456,
            }
          }
        }
      };
      getNetworkPreviewPaneData(state).should.eql({
        type: NETWORK_PREVIEW_PANE.EDGE_COACCUSALS,
        data: {
          items: [
            {
              date: 2003,
              hasData: true,
              key: '294088-YEAR-2003',
              kind: 'YEAR'
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
                  url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html'
                }
              ],
              timelineIdx: undefined,
            },
          ],
          info: {
            sourceOfficerName: 'Jerome Finnigan',
            targetOfficerName: 'Edward May',
            coaccusedCount: 1,
          }
        },
      });
    });

  });
});
