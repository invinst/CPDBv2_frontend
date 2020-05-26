import {
  geographicAllegationTransform,
  geographicTRRTransform,
} from 'selectors/common/geographic-preview-pane';


describe('GeographicPreviewPane selectors', function () {
  describe('geographicAllegationTransform', function () {
    it('should return correct item', function () {
      const allegation = {
        category: 'Use of Force',
        subcategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        'incident_date': '2017-02-03',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        victims: [
          {
            gender: 'Male',
            race: 'Black',
            age: 53,
          },
          {
            gender: '',
            race: '',
            age: null,
          },
        ],
        coaccused: [
          {
            'id': 16567,
            'full_name': 'Baudilio Lopez',
            'percentile_trr': '72.1094',
            'percentile_allegation_civilian': '98.5549',
            'percentile_allegation_internal': '61.1521',
            'percentile_allegation': '92.13',
            'allegation_count': 93,
          },
        ],
        to: '/complaint/123456/',
      };
      geographicAllegationTransform(allegation).should.eql({
        category: 'Use of Force',
        subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
        incidentDate: 'FEB 3, 2017',
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
              { axis: 'Civilian Allegations', value: 98.5549 },
            ],
            radarColor: '#F52524',
            count: 93,
          },
        ],
        to: '/complaint/123456/',
      });
    });
  });

  describe('geographicTRRTransform', function () {
    it('should return correct item', function () {
      const trr = {
        'firearm_used': true,
        date: '2017-02-03',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        officer: {
          'id': 16567,
          'full_name': 'Baudilio Lopez',
          'percentile_trr': '72.1094',
          'percentile_allegation_civilian': '98.5549',
          'percentile_allegation_internal': '61.1521',
          'percentile_allegation': '92.13',
          'allegation_count': 93,
        },
        to: '/trr/123456/',
      };
      geographicTRRTransform(trr).should.eql({
        category: 'Firearm',
        incidentDate: '2017-02-03',
        address: '14XX W 63RD ST, CHICAGO IL 60636',
        officer: {
          id: 16567,
          name: 'Baudilio Lopez',
          url: '/officer/16567/baudilio-lopez/',
          radarAxes: [
            { axis: 'Use of Force Reports', value: 72.1094 },
            { axis: 'Officer Allegations', value: 61.1521 },
            { axis: 'Civilian Allegations', value: 98.5549 },
          ],
          radarColor: '#F52524',
          count: 93,
        },
        to: '/trr/123456/',
      });
    });
  });
});
