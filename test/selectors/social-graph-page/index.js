import { getCurrentMainTab, getCurrentNetworkTab, hasComplaintSelector } from 'selectors/social-graph-page';


describe('Social Graph page selectors', function () {
  describe('getCurrentMainTab', function () {
    it('should return correct current main tab', function () {
      const state = {
        socialGraphPage: {
          currentMainTab: 'NETWORK'
        }
      };
      getCurrentMainTab(state).should.eql('NETWORK');
    });
  });

  describe('getCurrentNetworkTab', function () {
    it('should return correct current network tab', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            currentNetworkTab: 'Timeline'
          }
        }
      };
      getCurrentNetworkTab(state).should.eql('Timeline');
    });
  });

  describe('hasComplaintSelector', function () {
    it('should return true if there are networkAllegations', function () {
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
            ]
          }
        }
      };
      hasComplaintSelector(state).should.be.true();
    });

    it('should return false if networkAllegations is empty', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkAllegations: []
          }
        }
      };
      hasComplaintSelector(state).should.be.false();
    });
  });
});
