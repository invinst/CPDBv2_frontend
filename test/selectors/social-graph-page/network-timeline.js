import { allegationsSelector, allegationTransform } from 'selectors/social-graph-page/network-timeline';


describe('Social Graph page selectors', function () {
  describe('allegationsSelector', function () {
    it('should return allegations data correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkAllegations: [
              {
                'crid': 123,
                'incident_date': '1988-10-03',
                'most_common_category': {
                  'category': 'Use of Force',
                  'allegation_name': 'Miscellaneous'
                }
              },
              {
                'crid': 456,
                'incident_date': '1989-14-05',
                'most_common_category': {
                  'category': 'Illegal Search',
                }
              }
            ]
          }
        }
      };

      allegationsSelector(state).should.eql([{
        crid: 123,
        incidentDate: '1988-10-03',
        category: 'Use of Force',
        subcategory: 'Miscellaneous'
      }, {
        crid: 456,
        incidentDate: '1989-14-05',
        category: 'Illegal Search',
        subcategory: 'Unknown'
      }]);
    });
  });
  describe('allegationTransform', function () {
    it('should return allegation correctly', function () {
      const allegation = {
        'crid': '123456',
        'incident_date': '2007-10-10',
        'most_common_category': {
          'category': 'Use of Force',
          'allegation_name': 'Subcategory',
        }
      };
      allegationTransform(allegation).should.eql({
        crid: '123456',
        incidentDate: '2007-10-10',
        category: 'Use of Force',
        subcategory: 'Subcategory'
      });
    });
  });
});
