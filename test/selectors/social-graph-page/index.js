import { getCurrentMainTab, getCurrentNetworkTab } from 'selectors/social-graph-page';


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
});
