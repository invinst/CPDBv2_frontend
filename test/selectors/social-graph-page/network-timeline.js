import {
  attachmentTransform,
  allegationTransform,
  yearItem,
  fillYears,
  gapYearItems,
  getSocialGraphTimelineItems,
  getSocialGraphTimelineIdx,
  getSocialGraphRefreshIntervalId,
  getTimelineIdxTriggerChange,
} from 'selectors/social-graph-page/network-timeline';


describe('Social Graph page selectors', function () {
  describe('allegationTransform', function () {
    it('should return allegation correctly', function () {
      const allegation = {
        'crid': '123456',
        'incident_date': '2007-10-10',
        'most_common_category': {
          'category': 'Use of Force',
          'allegation_name': 'Subcategory',
        },
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
        'id': 456789
      };
      attachmentTransform(attachment).should.eql({
        fileType: 'document',
        previewImageUrl: 'http://lvh.me/preview/image/url',
        title: 'Document Title',
        url: 'http://lvh.me/document/url',
        id: 456789
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
        key: '123456'
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
        }
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
        }
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
        }
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
        }
      ];

      fillYears(sameYearItems).should.eql([
        {
          kind: 'YEAR',
          date: 2014,
          hasData: true,
          key: '1-YEAR-2014',
        },
        ...sameYearItems
      ]);
    });
  });

  describe('getSocialGraphTimelineItems', function () {
    it('should return empty if the state is empty', function () {
      getSocialGraphTimelineItems({
        socialGraphPage: {
          networkData: {
            networkAllegations: [],
          }
        }
      }).should.be.empty();
    });

    it('should process raw items with enough processors', function () {
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
                      'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
                    title: 'CRID 294088 CR',
                    'file_type': 'document',
                    'id': '123456',
                  }
                ]
              },
            ],
            graphData: {
              'list_event': ['2003-02-17', '2003-11-26']
            }
          },

        }
      };

      getSocialGraphTimelineItems(state).should.eql([
        {
          date: 2003,
          hasData: true,
          key: '260131-YEAR-2003',
          kind: 'YEAR'
        },
        {
          attachments: [],
          category: 'Criminal Misconduct',
          crid: '260131',
          incidentDate: 'FEB 17',
          key: '260131',
          kind: 'CR',
          subcategory: 'Theft',
          year: 2003,
          timelineIdx: 0,
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
              previewImageUrl: 'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
              title: 'CRID 294088 CR',
              url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html'
            }
          ],
          timelineIdx: 1,
        },
      ])
      ;
    });
  });

  describe('getSocialGraphTimelineIdx', function () {
    it('should return correct status', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            timelineIdx: 20,
          },
        }
      };
      getSocialGraphTimelineIdx(state).should.eql(20);
    });
  });

  describe('getSocialGraphRefreshIntervalId', function () {
    it('should return correct status', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            refreshIntervalId: 1234,
          },
        }
      };
      getSocialGraphRefreshIntervalId(state).should.eql(1234);
    });
  });

  describe('getTimelineIdxTriggerChange', function () {
    it('should return correct status', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            timelineIdxTriggerChange: 1,
          },
        }
      };
      getTimelineIdxTriggerChange(state).should.eql(1);
    });
  });
});
