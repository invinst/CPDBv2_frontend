import {
  pinnedOfficersSelector,
  pinnedCRsSelector,
  pinnedTRRsSelector,
  getPinnedCRs,
  getPinnedTRRs,
  getPinnedOfficers,
} from 'selectors/pinboard-page/items';


describe('Pinboard items selectors', function () {
  describe('pinnedOfficersSelector selector', function () {
    it('should return transformed officers', function () {
      const state = {
        pinboardPage: {
          officerItems: [{
            id: 1,
            'full_name': 'Daryl Mack',
            'complaint_count': 0,
            'sustained_count': 0,
            'birth_year': 1975,
            'complaint_percentile': 99.3450,
            race: 'White',
            gender: 'Male',
            rank: 'Police Officer',
            percentile: {
              'percentile_trr': '12.0000',
              'percentile_allegation': '99.3450',
              'percentile_allegation_civilian': '98.4344',
              'percentile_allegation_internal': '99.7840',
              year: 2016,
              id: 1,
            }
          }],
        }
      };

      pinnedOfficersSelector(state).should.eql([{
        id: '1',
        type: 'OFFICER',
        isPinned: true,
        birthYear: 1975,
        complaintCount: 0,
        complaintPercentile: 99.345,
        fullName: 'Daryl Mack',
        gender: 'male',
        officerId: 1,
        percentile: {
          items: [
            {
              axis: 'Use of Force Reports',
              value: 12,
            },
            {
              axis: 'Officer Allegations',
              value: 99.784,
            },
            {
              axis: 'Civilian Allegations',
              value: 98.4344,
            },
          ],
          textColor: '#231F20',
          visualTokenBackground: '#ff4f13',
          year: 2016,
        },
        race: 'white',
        rank: 'Police Officer',
        sustainedCount: 0,
      }]);
    });

    it('should return transformed CRs', function () {
      const state = {
        pinboardPage: {
          crItems: [{
            crid: '1000001',
            'incident_date': '2010-01-01',
            point: { 'lon': 1.0, 'lat': 1.0 },
            'most_common_category': 'Use Of Force',
          }],
        }
      };

      pinnedCRsSelector(state).should.eql([{
        id: '1000001',
        type: 'CR',
        isPinned: true,
        incidentDate: '2010-01-01',
        category: 'Use Of Force',
        point: { 'lon': 1.0, 'lat': 1.0 },
      }]);
    });

    it('should return transformed TRRs', function () {
      const state = {
        pinboardPage: {
          trrItems: [{
            id: 1,
            'trr_datetime': '2012-01-01',
            category: 'Impact Weapon',
            point: { 'lon': 1.0, 'lat': 1.0 },
          }],
        }
      };

      pinnedTRRsSelector(state).should.eql([{
        id: '1',
        type: 'TRR',
        isPinned: true,
        category: 'Impact Weapon',
        trrDate: '2012-01-01',
        point: { 'lon': 1.0, 'lat': 1.0 },
      }]);
    });
  });

  describe('getPinnedCRs', function () {
    const state = {
      pinboardPage: {
        crItems: [{
          crid: '1000001',
          'incident_date': '2010-01-01',
          point: { 'lon': 1.0, 'lat': 1.0 },
          'most_common_category': 'Use Of Force',
        }],
      }
    };

    getPinnedCRs(state).should.eql([{
      crid: '1000001',
      'incident_date': '2010-01-01',
      point: { 'lon': 1.0, 'lat': 1.0 },
      'most_common_category': 'Use Of Force',
    }]);
  });

  describe('getPinnedTRRs', function () {
    const state = {
      pinboardPage: {
        trrItems: [{
          id: 1,
          'trr_datetime': '2012-01-01',
          category: 'Impact Weapon',
          point: { 'lon': 1.0, 'lat': 1.0 },
        }],
      }
    };

    getPinnedTRRs(state).should.eql([{
      id: 1,
      'trr_datetime': '2012-01-01',
      category: 'Impact Weapon',
      point: { 'lon': 1.0, 'lat': 1.0 },
    }]);
  });

  describe('getPinnedOfficers', function () {
    const state = {
      pinboardPage: {
        officerItems: [{
          id: 1,
          'full_name': 'Daryl Mack',
          'complaint_count': 0,
          'sustained_count': 0,
          'birth_year': 1975,
          'complaint_percentile': 99.3450,
          race: 'White',
          gender: 'Male',
          rank: 'Police Officer',
          percentile: {
            'percentile_trr': '12.0000',
            'percentile_allegation': '99.3450',
            'percentile_allegation_civilian': '98.4344',
            'percentile_allegation_internal': '99.7840',
            year: 2016,
            id: 1,
          }
        }],
      }
    };

    getPinnedOfficers(state).should.eql([{
      id: 1,
      'full_name': 'Daryl Mack',
      'complaint_count': 0,
      'sustained_count': 0,
      'birth_year': 1975,
      'complaint_percentile': 99.3450,
      race: 'White',
      gender: 'Male',
      rank: 'Police Officer',
      percentile: {
        'percentile_trr': '12.0000',
        'percentile_allegation': '99.3450',
        'percentile_allegation_civilian': '98.4344',
        'percentile_allegation_internal': '99.7840',
        year: 2016,
        id: 1,
      }
    }]);
  });
});
