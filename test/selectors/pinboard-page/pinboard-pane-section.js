import should from 'should';

import { getCurrentTab } from 'selectors/pinboard-page/pinboard-pane-section';


describe('PinboardPaneSection selectors', function () {
  describe('getCurrentTab', function () {
    it('should return null if graph data is requesting', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              'coaccused_data': [{
                'officer_id_1': 1,
                'officer_id_2': 2,
                'incident_date': '1988-10-03',
                'accussed_count': 1
              }]
            },
          },
          geographicData: {
            crsRequesting: true,
            trrsRequesting: true,
            data: [],
          },
          currentTab: null
        }
      };
      should(getCurrentTab(state)).be.null();
    });

    it('should return null if geographic data is requesting', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: true,
            data: {}
          },
          geographicData: {
            crsRequesting: false,
            trrsRequesting: false,
            data: [{
              'date': '2006-09-26',
              'crid': '1000018',
              'category': 'Operation/Personnel Violations',
              'coaccused_count': 1,
              'kind': 'CR'
            }],
          },
          currentTab: null
        }
      };
      should(getCurrentTab(state)).be.null();
    });

    it('should return NETTWORK if currentTab is NETTWORK', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              'coaccused_data': []
            },
          },
          geographicData: {
            crsRequesting: false,
            trrsRequesting: false,
            data: [{
              'date': '2006-09-26',
              'crid': '1000018',
              'category': 'Operation/Personnel Violations',
              'coaccused_count': 1,
              'kind': 'CR'
            }],
          },
          currentTab: 'NETTWORK'
        }
      };
      getCurrentTab(state).should.eql('NETTWORK');
    });

    it('should return GEOGRAPHIC if currentTab is GEOGRAPHIC', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              'coaccused_data': [{
                'officer_id_1': 1,
                'officer_id_2': 2,
                'incident_date': '1988-10-03',
                'accussed_count': 1
              }]
            },
          },
          geographicData: {
            crsRequesting: false,
            trrsRequesting: false,
            mapCrsData: [{
              'date': '2006-09-26',
              'crid': '1000018',
              'category': 'Operation/Personnel Violations',
              'coaccused_count': 1,
              'kind': 'CR'
            }],
          },
          currentTab: 'GEOGRAPHIC'
        }
      };
      getCurrentTab(state).should.eql('GEOGRAPHIC');
    });

    it('should return NETWORK if currentTab is GEOGRAPHIC and geographic data are empty', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              'coaccused_data': []
            }
          },
          geographicData: {
            crsRequesting: false,
            trrsRequesting: false,
            mapCrsData: [],
            mapTrrsData: [],
          },
          currentTab: 'GEOGRAPHIC'
        }
      };
      getCurrentTab(state).should.eql('NETWORK');
    });

    it('should return NETWORK if currentTab is null and both coaccused and geographic data are empty', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              'coaccused_data': []
            }
          },
          geographicData: {
            crsRequesting: false,
            trrsRequesting: false,
            data: [],
          },
          currentTab: null
        }
      };
      getCurrentTab(state).should.eql('NETWORK');
    });

    it('should return GEOGRAPHIC if currentTab is null and coaccused_data are empty', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              'coaccused_data': []
            }
          },
          geographicData: {
            crsRequesting: false,
            trrsRequesting: false,
            mapCrsData: [{
              'date': '2006-09-26',
              'crid': '1000018',
              'category': 'Operation/Personnel Violations',
              'coaccused_count': 1,
              'kind': 'CR'
            }],
          },
          currentTab: null
        }
      };
      getCurrentTab(state).should.eql('GEOGRAPHIC');
    });
  });
});
