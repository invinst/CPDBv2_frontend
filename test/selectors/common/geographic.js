import {
  crMapMarkersTransform,
  trrMapMarkerTransform,
  geographicAllegationTransform
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

  describe('geographicAllegationTransform', function () {
    it('should return correct item', function () {
      const allegation = {
        category: 'Use of Force',
        subcategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        date: '2017-02-03',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: [
          {
            gender: 'Male',
            race: 'Black',
            age: 53
          }
        ],
        coaccused: [
          {
            'id': 16567,
            'full_name': 'Baudilio Lopez',
            'percentile': {
              'id': 180838,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521'
            },
            'allegation_count': 93
          }
        ],
        to: '/complaint/123456/'
      };
      geographicAllegationTransform(allegation).should.eql({
        category: 'Use of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        incidentDate: '2017-02-03',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: ['Black, Male, Age 53'],
        coaccused: [
          {
            id: 16567,
            name: 'Baudilio Lopez',
            url: '/officer/16567/baudilio-lopez/',
            radarAxes: [
              { axis: 'Use of Force Reports', value: 72.1094 },
              { axis: 'Officer Allegations', value: 61.1521 },
              { axis: 'Civilian Allegations', value: 98.5549 }
            ],
            radarColor: '#f0201e',
            count: 93
          }
        ],
        to: '/complaint/123456/'
      });
    });
  });
});
