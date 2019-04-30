import { mapLegendSelector, mapMarkersSelector } from 'selectors/social-graph-page/geographic-data';


describe('GeographicData selectors', function () {
  describe('mapLegendSelector', function () {
    it('should return correct legend info', function () {
      const state = {
        socialGraphPage: {
          geographicData: [
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
          ]
        }
      };
      mapLegendSelector(state).should.eql({
        allegationCount: 3,
        useOfForceCount: 2,
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
        'coaccused_count': 6,
        victims: [{
          gender: 'Male',
          race: 'White',
          age: 35
        }]
      };
      const secondCr = {
        category: 'Illegal Search',
        kind: 'CR',
        point: {
          lat: 41.7630623832,
          lon: -87.67122688239999
        },
        crid: '294619',
        'coaccused_count': 9,
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
      };
      const state = {
        socialGraphPage: {
          geographicData: [firstCr, secondCr, trr]
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
        victims: [{
          gender: 'Male',
          race: 'White',
          age: 35
        }],
        coaccused: 6,
      }, {
        category: 'Illegal Search',
        kind: 'CR',
        point: {
          lat: 41.7630623832,
          lon: -87.67122688239999
        },
        id: '294619',
        coaccused: 9,
        victims: undefined,
      }, {
        point: {
          lat: 35.3,
          lon: 50.5
        },
        kind: 'FORCE',
        id: '123456',
        category: 'Firearm',
      }]);
    });
  });
});
