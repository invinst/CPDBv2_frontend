import {
  pinnedOfficersSelector,
  pinnedCRsSelector,
  pinnedTRRsSelector,
  getPinnedCRs,
  getPinnedTRRs,
  getPinnedOfficers,
  getPinnedCRsRequesting,
  getPinnedOfficersRequesting,
  getPinnedTRRsRequesting,
} from 'selectors/pinboard-page/items';


describe('Pinboard items selectors', function () {
  describe('pinnedOfficersSelector selector', function () {
    it('should return transformed officers', function () {
      pinnedOfficersSelector({
        pinboardPage: {
          officerItems: {
            requesting: false,
            items: [{
              id: 1,
              'full_name': 'Daryl Mack',
              'complaint_count': 0,
              'sustained_count': 0,
              'birth_year': 1975,
              race: 'White',
              gender: 'Male',
              rank: 'Police Officer',
              'percentile_trr': '12.0000',
              'percentile_allegation': '99.3450',
              'percentile_allegation_civilian': '98.4344',
              'percentile_allegation_internal': '99.7840',
            }],
          },
        },
      }).should.eql([{
        id: '1',
        type: 'OFFICER',
        isPinned: true,
        age: '42-year-old',
        complaintCount: 0,
        allegationPercentile: 99.345,
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
          textColor: '#DFDFDF',
          visualTokenBackground: '#F52524',
        },
        race: 'white',
        rank: 'Police Officer',
        sustainedCount: 0,
        isPinStatusChanging: false,
      }]);

      pinnedOfficersSelector({
        pinboardPage: {
          officerItems: {
            requesting: false,
            items: [{
              id: 1,
              'full_name': 'Daryl Mack',
              'complaint_count': 0,
              'sustained_count': 0,
              'birth_year': 1975,
              race: 'White',
              gender: 'Male',
              rank: 'Police Officer',
              'percentile_trr': '12.0000',
              'percentile_allegation': '99.3450',
              'percentile_allegation_civilian': '98.4344',
              'percentile_allegation_internal': '99.7840',
            }],
          },
        },
      }).should.eql([{
        id: '1',
        type: 'OFFICER',
        isPinned: true,
        age: '42-year-old',
        complaintCount: 0,
        allegationPercentile: 99.345,
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
          textColor: '#DFDFDF',
          visualTokenBackground: '#F52524',
        },
        race: 'white',
        rank: 'Police Officer',
        sustainedCount: 0,
        isPinStatusChanging: false,
      }]);

      pinnedOfficersSelector({
        pinboardPage: {
          officerItems: {
            requesting: false,
            items: [{
              id: 1,
              'full_name': 'Daryl Mack',
              'complaint_count': 0,
              'sustained_count': 0,
              'birth_year': 1975,
              race: 'White',
              gender: 'Male',
              rank: 'Police Officer',
              'percentile_trr': '12.0000',
              'percentile_allegation': '99.3450',
              'percentile_allegation_civilian': '98.4344',
              'percentile_allegation_internal': '99.7840',
            }],
          },
          pinItemFromPreviewPane: {
            type: 'OFFICER',
            id: 1,
          },
        },
      }).should.eql([{
        id: '1',
        type: 'OFFICER',
        isPinned: true,
        age: '42-year-old',
        complaintCount: 0,
        allegationPercentile: 99.345,
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
          textColor: '#DFDFDF',
          visualTokenBackground: '#F52524',
        },
        race: 'white',
        rank: 'Police Officer',
        sustainedCount: 0,
        isPinStatusChanging: true,
      }]);
    });

    it('should return transformed CRs', function () {
      pinnedCRsSelector({
        pinboardPage: {
          crItems: {
            requesting: false,
            items: [{
              crid: '1000001',
              'incident_date': '2010-01-01',
              point: { 'lon': 1.0, 'lat': 1.0 },
              category: 'Use Of Force',
            }],
          },
        },
      }).should.eql([{
        id: '1000001',
        type: 'CR',
        isPinned: true,
        incidentDate: '2010-01-01',
        category: 'Use Of Force',
        point: { 'lon': 1.0, 'lat': 1.0 },
        isPinStatusChanging: false,
      }]);

      pinnedCRsSelector({
        pinboardPage: {
          crItems: {
            requesting: false,
            items: [{
              crid: '1000001',
              'incident_date': '2010-01-01',
              point: { 'lon': 1.0, 'lat': 1.0 },
              category: 'Use Of Force',
            }],
          },
          pinItemFromPreviewPane: {
            type: 'CR',
            id: '1000001',
          },
        },
      }).should.eql([{
        id: '1000001',
        type: 'CR',
        isPinned: true,
        incidentDate: '2010-01-01',
        category: 'Use Of Force',
        point: { 'lon': 1.0, 'lat': 1.0 },
        isPinStatusChanging: true,
      }]);
    });

    it('should return transformed TRRs', function () {
      pinnedTRRsSelector({
        pinboardPage: {
          trrItems: {
            requesting: false,
            items: [{
              id: '1',
              'trr_datetime': '2012-01-01',
              category: 'Impact Weapon',
              point: { 'lon': 1.0, 'lat': 1.0 },
            }],
          },
        },
      }).should.eql([{
        id: '1',
        type: 'TRR',
        isPinned: true,
        category: 'Impact Weapon',
        trrDate: '2012-01-01',
        point: { 'lon': 1.0, 'lat': 1.0 },
        isPinStatusChanging: false,
      }]);

      pinnedTRRsSelector({
        pinboardPage: {
          trrItems: {
            requesting: false,
            items: [{
              id: '1',
              'trr_datetime': '2012-01-01',
              category: 'Impact Weapon',
              point: { 'lon': 1.0, 'lat': 1.0 },
            }],
          },
          pinItemFromPreviewPane: {
            type: 'TRR',
            id: '1',
          },
        },
      }).should.eql([{
        id: '1',
        type: 'TRR',
        isPinned: true,
        category: 'Impact Weapon',
        trrDate: '2012-01-01',
        point: { 'lon': 1.0, 'lat': 1.0 },
        isPinStatusChanging: true,
      }]);
    });
  });

  describe('getPinnedCRsRequesting', function () {
    it('should return requesting status', function () {
      getPinnedCRsRequesting({
        pinboardPage: {
          crItems: {
            requesting: true,
            items: [],
          },
        },
      }).should.be.true();

      getPinnedCRsRequesting({
        pinboardPage: {
          crItems: {
            requesting: false,
            items: [],
          },
        },
      }).should.be.false();
    });
  });

  describe('getPinnedOfficersRequesting', function () {
    it('should return requesting status', function () {
      getPinnedOfficersRequesting({
        pinboardPage: {
          officerItems: {
            requesting: true,
            items: [],
          },
        },
      }).should.be.true();

      getPinnedOfficersRequesting({
        pinboardPage: {
          officerItems: {
            requesting: false,
            items: [],
          },
        },
      }).should.be.false();
    });
  });

  describe('getPinnedTRRsRequesting', function () {
    it('should return requesting status', function () {
      getPinnedTRRsRequesting({
        pinboardPage: {
          trrItems: {
            requesting: true,
            items: [],
          },
        },
      }).should.be.true();

      getPinnedTRRsRequesting({
        pinboardPage: {
          trrItems: {
            requesting: false,
            items: [],
          },
        },
      }).should.be.false();
    });
  });

  describe('getPinnedCRs', function () {
    it('should return pinned CRs correctly', function () {
      const state = {
        pinboardPage: {
          crItems: {
            requesting: false,
            items: [{
              crid: '1000001',
              'incident_date': '2010-01-01',
              point: { 'lon': 1.0, 'lat': 1.0 },
              'most_common_category': 'Use Of Force',
            }],
          },
        },
      };

      getPinnedCRs(state).should.eql([{
        crid: '1000001',
        'incident_date': '2010-01-01',
        point: { 'lon': 1.0, 'lat': 1.0 },
        'most_common_category': 'Use Of Force',
      }]);
    });
  });

  describe('getPinnedTRRs', function () {
    it('should return pinned TRRs correctly', function () {
      const state = {
        pinboardPage: {
          trrItems: {
            requesting: false,
            items: [{
              id: 1,
              'trr_datetime': '2012-01-01',
              category: 'Impact Weapon',
              point: { 'lon': 1.0, 'lat': 1.0 },
            }],
          },
        },
      };

      getPinnedTRRs(state).should.eql([{
        id: 1,
        'trr_datetime': '2012-01-01',
        category: 'Impact Weapon',
        point: { 'lon': 1.0, 'lat': 1.0 },
      }]);
    });
  });

  describe('getPinnedOfficers', function () {
    it('should return pinned officers correctly', function () {
      const state = {
        pinboardPage: {
          officerItems: {
            requesting: false,
            items: [{
              id: 1,
              'full_name': 'Daryl Mack',
              'complaint_count': 0,
              'sustained_count': 0,
              'birth_year': 1975,
              race: 'White',
              gender: 'Male',
              rank: 'Police Officer',
              'percentile_trr': '12.0000',
              'percentile_allegation': '99.3450',
              'percentile_allegation_civilian': '98.4344',
              'percentile_allegation_internal': '99.7840',
            }],
          },
        },
      };

      getPinnedOfficers(state).should.eql([{
        id: 1,
        'full_name': 'Daryl Mack',
        'complaint_count': 0,
        'sustained_count': 0,
        'birth_year': 1975,
        race: 'White',
        gender: 'Male',
        rank: 'Police Officer',
        'percentile_trr': '12.0000',
        'percentile_allegation': '99.3450',
        'percentile_allegation_civilian': '98.4344',
        'percentile_allegation_internal': '99.7840',
      }]);
    });
  });
});
