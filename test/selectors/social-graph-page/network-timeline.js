import {
  socialGraphTimelineItemsSelector,
  getSocialGraphTimelineIdx,
  getSocialGraphRefreshIntervalId,
  getTimelineIdxTriggerChange,
} from 'selectors/social-graph-page/network-timeline';


describe('Social Graph page selectors', function () {
  describe('socialGraphTimelineItemsSelector', function () {
    it('should return empty if the state is empty', function () {
      socialGraphTimelineItemsSelector({
        socialGraphPage: {
          networkData: {
            graphData: {},
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
                category: 'Criminal Misconduct',
                subcategory: 'Theft',
                crid: '260131',
                'incident_date': '2003-02-17',
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

      socialGraphTimelineItemsSelector(state).should.eql([
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
