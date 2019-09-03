import {
  officersSelector,
  coaccusedDataSelector,
  getListEvent,
  attachmentTransform,
  allegationTransform,
  yearItem,
  fillYears,
  gapYearItems,
  edgeCoaccusalsItemsSelector,
  selectedEdgeDataSelector,
  getRequesting,
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
                  'percentile': {
                    'percentile_trr': '78.2707',
                    'percentile_allegation_civilian': '97.8772',
                    'percentile_allegation_internal': '61.1521',
                  },
                },
                {
                  'full_name': 'Edward May',
                  'id': 2,
                  'percentile': {
                    'percentile_trr': '80',
                    'percentile_allegation_civilian': '85',
                    'percentile_allegation_internal': '90',
                  },
                },
              ],
            },
          },
        },
      };

      officersSelector(state).should.eql(
        [
          {
            fullName: 'Jerome Finnigan',
            id: 1,
            visualTokenBackground: '#f0201e',
          },
          {
            fullName: 'Edward May',
            id: 2,
            visualTokenBackground: '#f0201e',
          },
        ]
      );
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
                  'incident_date': '1988-10-03',
                  'accussed_count': 1,
                },
                {
                  'officer_id_1': 3,
                  'officer_id_2': 4,
                  'incident_date': '1990-10-03',
                  'accussed_count': 5,
                },
              ],
            },
          },
        },
      };

      coaccusedDataSelector(state).should.eql([{
        officerId1: 1,
        officerId2: 2,
        incidentDate: '1988-10-03',
        accussedCount: 1,
      }, {
        officerId1: 3,
        officerId2: 4,
        incidentDate: '1990-10-03',
        accussedCount: 5,
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
                '1988-10-03',
                '1989-12-11',
                '1990-01-09',
                '1990-12-13',
                '1991-01-02',
                '1991-01-06',
                '1991-01-15',
                '1991-02-18',
                '1991-02-20',
                '1991-03-06',
              ],
            },
          },
        },
      };

      getListEvent(state).should.eql([
        '1988-10-03',
        '1989-12-11',
        '1990-01-09',
        '1990-12-13',
        '1991-01-02',
        '1991-01-06',
        '1991-01-15',
        '1991-02-18',
        '1991-02-20',
        '1991-03-06',
      ]);
    });
  });

  describe('allegationTransform', function () {
    it('should return allegation correctly', function () {
      const allegation = {
        'crid': '123456',
        'incident_date': '2007-10-10',
        'category': 'Use of Force',
        'subcategory': 'Subcategory',
        'attachments': [],
        'timelineIdx': 1,
      };
      allegationTransform(allegation).should.eql({
        crid: '123456',
        kind: 'CR',
        year: 2007,
        incidentDate: 'OCT 10',
        category: 'Use of Force',
        subcategory: 'Subcategory',
        attachments: [],
        key: '123456',
        timelineIdx: 1,
      });
    });
  });

  describe('attachmentTransform', function () {
    it('should return allegation correctly', function () {
      const attachment = {
        'file_type': 'document',
        'preview_image_url': 'http://lvh.me/preview/image/url',
        'title': 'Document Title',
        'url': 'http://lvh.me/document/url',
        'id': 456789,
      };
      attachmentTransform(attachment).should.eql({
        fileType: 'document',
        previewImageUrl: 'http://lvh.me/preview/image/url',
        title: 'Document Title',
        url: 'http://lvh.me/document/url',
        id: 456789,
      });
    });
  });

  describe('yearItem', function () {
    it('should copy unit and rank info from baseItem', function () {
      const baseItem = {
        crid: '123456',
        kind: 'CR',
        year: 2007,
        incidentDate: 'OCT 10',
        category: 'Use of Force',
        subcategory: 'Subcategory',
        attachments: [],
        key: '123456',
      };

      yearItem(baseItem, 2007, true).should.eql({
        kind: 'YEAR',
        date: 2007,
        hasData: true,
        key: '123456-YEAR-2007',
      });
    });
  });

  describe('gapYearItems', function () {
    it('should return correct year items', function () {
      const fromItem = {
        year: 2014,
        incidentDate: 'MAR 1',
        kind: 'CR',
        key: 1,
      };
      const toItem = {
        year: 2011,
        incidentDate: 'MAR 1',
        kind: 'CR',
        key: 2,
      };

      gapYearItems(fromItem, toItem).should.eql([
        {
          kind: 'YEAR',
          date: 2013,
          hasData: false,
          key: '2-YEAR-2013',
        },
        {
          kind: 'YEAR',
          date: 2012,
          hasData: false,
          key: '2-YEAR-2012',
        },
      ]);
    });
  });

  describe('fillYears', function () {
    it('should fill year items into correct indexes', function () {
      const items = [
        {
          year: 2014,
          date: 'MAR 1',
          kind: 'CR',
          key: 1,
        },
        {
          year: 2011,
          date: 'MAR 1',
          kind: 'CR',
          key: 2,
        },
      ];

      fillYears(items).should.eql([
        {
          kind: 'YEAR',
          date: 2014,
          hasData: true,
          key: '1-YEAR-2014',
        },
        {
          year: 2014,
          date: 'MAR 1',
          kind: 'CR',
          key: 1,
        },
        {
          kind: 'YEAR',
          date: 2013,
          hasData: false,
          key: '2-YEAR-2013',
        },
        {
          kind: 'YEAR',
          date: 2012,
          hasData: false,
          key: '2-YEAR-2012',
        },
        {
          kind: 'YEAR',
          date: 2011,
          hasData: true,
          key: '2-YEAR-2011',
        },
        {
          year: 2011,
          date: 'MAR 1',
          kind: 'CR',
          key: 2,
        },
      ]);
    });

    it('should fill no years between two items that in the same year', function () {
      const sameYearItems = [
        {
          year: 2014,
          incidentDate: 'MAR 1',
          kind: 'CR',
          key: 1,
        },
        {
          year: 2014,
          incidentDate: 'MAR 1',
          kind: 'CR',
          key: 2,
        },
      ];

      fillYears(sameYearItems).should.eql([
        {
          kind: 'YEAR',
          date: 2014,
          hasData: true,
          key: '1-YEAR-2014',
        },
        ...sameYearItems,
      ]);
    });
  });

  describe('edgeCoaccusalsItemsSelector', function () {
    it('should return edge coaccusals items correctly', function () {
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
            selectedEdge: {
              sourceUid: 123,
              targetUid: 456,
            },
          },
        },
      };
      edgeCoaccusalsItemsSelector(state).should.eql([
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
      ]);
    });
  });

  describe('selectedEdgeDataSelector', function () {
    it('should return selected edge correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkAllegations: [
              {
                'most_common_category': {
                  category: 'Criminal Misconduct',
                  'allegation_name': 'Theft',
                },
                crid: '260131',
                'incident_date': '2003-02-17',
                'officer_ids': [123, 456],
              },
              {
                'most_common_category': {
                  category: 'Illegal Search',
                  'allegation_name': 'Search Of Premise Without Warrant',
                },
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
            selectedEdge: {
              sourceUid: 123,
              targetUid: 456,
            },
          },
        },
      };
      selectedEdgeDataSelector(state).should.eql({
        sourceUid: 123,
        targetUid: 456,
        coaccusedCount: 2,
      });
    });
  });

  describe('getRequesting', function () {
    it('should return requesting status', function () {
      getRequesting({
        socialGraphPage: {
          networkData: { requesting: false },
        },
      }).should.be.false();

      getRequesting({
        socialGraphPage: {
          networkData: { requesting: true },
        },
      }).should.be.true();
    });
  });
});
