import {
  crMapMarkersTransform,
  trrMapMarkerTransform,
} from 'selectors/common/geographic';


describe('GeographicData selectors', function () {
  describe('crMapMarkersTransform', function () {
    it('should return correct item', function () {
      const crItem = {
        category: 'Conduct Unbecoming (Off-Duty)',
        kind: 'CR',
        point: {
          lat: 41.887673,
          lon: -87.62355
        },
        crid: '1002787',
        'coaccused_count': 1,
        victims: [
          {
            gender: 'Male',
            age: null,
            race: 'Hispanic'
          },
          {
            gender: 'Female',
            age: null,
            race: 'White'
          },
          {
            gender: 'Male',
            age: 46,
            race: 'Hispanic'
          }
        ]
      };
      crMapMarkersTransform(crItem).should.eql({
        point: {
          lat: 41.887673,
          lon: -87.62355
        },
        kind: 'CR',
        id: '1002787',
        category: 'Conduct Unbecoming (Off-Duty)',
        victims: [
          {
            gender: 'Male',
            age: null,
            race: 'Hispanic'
          },
          {
            gender: 'Female',
            age: null,
            race: 'White'
          },
          {
            gender: 'Male',
            age: 46,
            race: 'Hispanic'
          },
        ],
        coaccused: 1,
      });
    });
  });

  describe('trrMapMarkersTransform', function () {
    it('should return correct item', function () {
      const trrItem = {
        'trr_id': '56789',
        kind: 'FORCE',
        taser: true,
        'firearm_used': false,
        point: {
          lat: 50,
          lon: -87
        }
      };
      trrMapMarkerTransform(trrItem).should.eql({
        point: {
          lat: 50,
          lon: -87
        },
        kind: 'FORCE',
        id: '56789',
        category: 'Taser',
      });
    });
  });
});
