import { officerDetailTransform, networkOfficersSelector } from 'selectors/social-graph-page/network-officers';


describe('Social Graph page selectors', function () {
  describe('officerDetailTransform', function () {
    it('should return detail officer correctly', function () {
      const officer = {
        'id': 123,
        'full_name': 'Jerome Finnigan',
        'appointed_date': '2001-07-08',
        'resignation_date': '2005-10-10',
        'badge': '123456',
        'gender': 'Male',
        'birth_year': 1970,
        'race': 'White',
        'rank': 'Police Officer',
        'unit': {
          'id': 456,
          'unit_name': 'Unit 715',
          'description': 'This is unit description',
        },
        'allegation_count': 10,
        'sustained_count': 5,
        'civilian_compliment_count': 20,
        'discipline_count': 3,
        'trr_count': 7,
        'major_award_count': 15,
        'honorable_mention_count': 12,
        'percentile': {
          'officer_id': 123,
          'year': 2017,
          'percentile_allegation': '95',
          'percentile_trr': '90',
          'percentile_allegation_civilian': '97.0',
          'percentile_allegation_internal': '82.0',
        },
        'honorable_mention_percentile': '70'
      };

      officerDetailTransform(officer).should.eql({
        id: 123,
        fullName: 'Jerome Finnigan',
        percentile: {
          officerId: 123,
          year: 2017,
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },

          ],
          visualTokenBackground: '#f52524',
          textColor: '#DFDFDF',
        }
      });
    });
  });

  describe('networkOfficersSelector', function () {
    it('should return network officer correctly', function () {
      const state = {
        socialGraphPage: {
          networkData: {
            networkOfficers: [
              {
                'id': 123,
                'full_name': 'Jerome Finnigan',
                'appointed_date': '2001-07-08',
                'resignation_date': '2005-10-10',
                'badge': '123456',
                'gender': 'Male',
                'birth_year': 1970,
                'race': 'White',
                'rank': 'Police Officer',
                'unit': {
                  'id': 456,
                  'unit_name': 'Unit 715',
                  'description': 'This is unit description',
                },
                'allegation_count': 10,
                'sustained_count': 5,
                'civilian_compliment_count': 20,
                'discipline_count': 3,
                'trr_count': 7,
                'major_award_count': 15,
                'honorable_mention_count': 12,
                'percentile': {
                  'officer_id': 123,
                  'year': 2017,
                  'percentile_allegation': '95',
                  'percentile_trr': '90',
                  'percentile_allegation_civilian': '97.0',
                  'percentile_allegation_internal': '82.0',
                },
                'honorable_mention_percentile': '70'
              }
            ]
          }
        }
      };
      networkOfficersSelector(state).should.eql([{
        id: 123,
        fullName: 'Jerome Finnigan',
        percentile: {
          officerId: 123,
          year: 2017,
          items: [
            { axis: 'Use of Force Reports', value: 90 },
            { axis: 'Officer Allegations', value: 82 },
            { axis: 'Civilian Allegations', value: 97 },

          ],
          visualTokenBackground: '#f52524',
          textColor: '#DFDFDF',
        }
      }]);
    });
  });
});
