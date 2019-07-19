import {
  mapLegendSelector,
  mapMarkersSelector,
  hasMapMarkersSelector,
  geographicDataRequestingSelector,
} from 'selectors/pinboard-page/geographic-data';


describe('GeographicData selectors', function () {
  describe('mapLegendSelector', function () {
    it('should return correct legend info', function () {
      const state = {
        pinboardPage: {
          geographicData: {
            mapCrsDataTotalCount: 5,
            mapTrrsDataTotalCount: 2,
            mapCrsData: [
              {
                category: 'Illegal Search',
                kind: 'CR',

                crid: '294619',
                'coaccused_count': 9,
              },
              {
                category: 'Illegal Search',
                kind: 'CR',

                crid: '294620',
                'coaccused_count': 10,
              },
              {
                category: 'Illegal Search',
                kind: 'CR',

                crid: '294621',
                'coaccused_count': 11,
              },
            ],
            mapTrrsData: [
              {
                'trr_id': '123456',
                kind: 'FORCE',
                taser: false,
                'firearm_used': true,
              },
              {
                'trr_id': '654321',
                kind: 'FORCE',
                taser: true,
                'firearm_used': false,
              }
            ],
          }
        }
      };
      mapLegendSelector(state).should.eql({
        allegationCount: 3,
        useOfForceCount: 2,
        allegationLoading: true,
        useOfForceLoading: false,
      });
    });
  });

  describe('mapMarkersSelector', function () {
    it('should return correct marker', function () {
      const firstCr = {
        category: 'Illegal Search',
        kind: 'CR',
        point: {
          lat: 41.918008,
          lon: -87.73173299999999
        },
        crid: '1045343',
        date: 'MAR 17, 2012',
      };
      const secondCr = {
        category: 'Illegal Search',
        kind: 'CR',
        point: {
          lat: 41.7630623832,
          lon: -87.67122688239999
        },
        crid: '294619',
        date: 'MAR 20, 2013',
      };
      const trr = {
        'trr_id': '123456',
        kind: 'FORCE',
        taser: false,
        'firearm_used': true,
        point: {
          lat: 35.3,
          lon: 50.5
        },
        date: 'MAY 12, 2015',
      };
      const state = {
        pinboardPage: {
          geographicData: {
            requesting: false,
            mapCrsData: [firstCr, secondCr],
            mapTrrsData: [trr],
          }
        }
      };
      mapMarkersSelector(state).should.eql([{
        point: {
          lat: 41.918008,
          lon: -87.73173299999999
        },
        kind: 'CR',
        id: '1045343',
        category: 'Illegal Search',
        date: 'MAR 17, 2012',
      }, {
        category: 'Illegal Search',
        kind: 'CR',
        point: {
          lat: 41.7630623832,
          lon: -87.67122688239999
        },
        id: '294619',
        date: 'MAR 20, 2013',
      }, {
        point: {
          lat: 35.3,
          lon: 50.5
        },
        kind: 'FORCE',
        id: '123456',
        category: 'Firearm',
        date: 'MAY 12, 2015',
      }]);
    });
  });

  describe('hasMapMarkersSelector', function () {
    it('should return false if there is no marker', function () {
      const state = {
        pinboardPage: {
          geographicData: []
        }
      };
      hasMapMarkersSelector(state).should.be.false();
    });

    it('should return true if have marker', function () {
      const state = {
        pinboardPage: {
          geographicData: {
            requesting: false,
            mapCrsData: [{
              category: 'Illegal Search',
              kind: 'CR',
              crid: '1045343',
              'coaccused_count': 6,
            }]
          }
        }
      };
      hasMapMarkersSelector(state).should.be.true();
    });
  });

  describe('geographicDataRequestingSelector', function () {
    it('should return false if data is requested', function () {
      geographicDataRequestingSelector({
        pinboardPage: {
          geographicData: { crsRequesting: false, trrsRequesting: false },
        }
      }).should.be.false();
    });

    it('should return true if data is requesting', function () {
      geographicDataRequestingSelector({
        pinboardPage: {
          geographicData: { crsRequesting: false, trrsRequesting: true },
        }
      }).should.be.true();

      geographicDataRequestingSelector({
        pinboardPage: {
          geographicData: { crsRequesting: true, trrsRequesting: false },
        }
      }).should.be.true();
    });
  });
});
