import {
  graphDataSelector,
  getSocialGraphRequesting,
} from 'selectors/pinboard-admin-page/social-graph';


describe('PinboardPage selectors', function () {
  describe('graphDataSelector', function () {
    it('should return graph data correctly', function () {
      const state = {
        pinboardAdminPage: {
          graphData: {
            requesting: false,
            cachedData: [
              {
                'pinboard_id': 'abcd1234',
                officers: [
                  {
                    'full_name': 'Jerome Finnigan',
                    'id': 1,
                    'percentile_trr': '78.2707',
                    'percentile_allegation_civilian': '97.8772',
                    'percentile_allegation_internal': '61.1521',
                    'percentile_allegation': '99.9999',
                  },
                  {
                    'full_name': 'Edward May',
                    'id': 2,
                    'percentile_trr': '80.0000',
                    'percentile_allegation_civilian': '85.0000',
                    'percentile_allegation_internal': '90.0000',
                    'percentile_allegation': '99.9000',
                  },
                ],
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
            ],
          },
        },
      };
      const props = { pinboardId: 'abcd1234' };

      graphDataSelector(state, props).should.eql({
        officers: [
          {
            fullName: 'Jerome Finnigan',
            id: 1,
            visualTokenBackground: '#F52524',
          },
          {
            fullName: 'Edward May',
            id: 2,
            visualTokenBackground: '#F52524',
          },
        ],
        coaccusedData: [
          {
            officerId1: 1,
            officerId2: 2,
            incidentDate: '1988-10-03',
            accussedCount: 1,
          },
          {
            officerId1: 3,
            officerId2: 4,
            incidentDate: '1990-10-03',
            accussedCount: 5,
          },
        ],
        listEvent: [
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
      });
    });
  });

  describe('getSocialGraphRequesting', function () {
    it('should return requesting status', function () {
      getSocialGraphRequesting({
        pinboardAdminPage: {
          graphData: { requesting: false, cachedData: [] },
        },
      }).should.be.false();

      getSocialGraphRequesting({
        pinboardAdminPage: {
          graphData: { requesting: true, cachedData: [] },
        },
      }).should.be.true();
    });
  });
});
