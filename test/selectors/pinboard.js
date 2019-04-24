import { getPinboard, pinboardItemsSelector, getPinboardItems } from 'selectors/pinboard';
import PinboardFactory from 'utils/test/factories/pinboard';


describe('Pinboard selectors', function () {
  describe('getPinboard', function () {
    it('should return correct format of null pinboard', function () {
      const state = { pinboard: null };
      getPinboard(state).should.eql({
        id: null,
        title: '',
        officerIds: [],
        crids: [],
        trrIds: [],
        description: '',
        url: '',
        itemsCount: 0,
        crItems: [],
        officerItems: [],
        trrItems: [],
      });
    });

    it('should return pinboard with correct format', function () {
      const state = {
        pinboard: PinboardFactory.build({
          id: 1,
          title: 'Pinboard Title',
          'officer_ids': [12],
          crids: ['abc'],
          'trr_ids': [1],
          description: 'Description',
          crItems: [{ crid: 'abc' }],
          officerItems: [{ id: 12 }],
          trrItems: [{ id: 1 }],
        }),
      };

      getPinboard(state).should.eql({
        id: '1',
        title: 'Pinboard Title',
        officerIds: ['12'],
        crids: ['abc'],
        trrIds: ['1'],
        description: 'Description',
        url: '/pinboard/1/pinboard-title/',
        itemsCount: 3,
        crItems: [{ crid: 'abc' }],
        officerItems: [{ id: 12 }],
        trrItems: [{ id: 1 }],
      });
    });

    it('should return correct format of pinboard whose title is empty', function () {
      const state = {
        pinboard: PinboardFactory.build({
          id: 1,
          title: '',
          'officer_ids': [12],
          crids: ['abc'],
          'trr_ids': [1],
          description: 'Description',
          crItems: [{ crid: 'abc' }],
          officerItems: [{ id: 12 }],
          trrItems: [{ id: 1 }],
        }),
      };

      getPinboard(state).should.eql({
        id: '1',
        title: '',
        officerIds: ['12'],
        crids: ['abc'],
        trrIds: ['1'],
        description: 'Description',
        url: '/pinboard/1/untitled-pinboard/',
        itemsCount: 3,
        crItems: [{ crid: 'abc' }],
        officerItems: [{ id: 12 }],
        trrItems: [{ id: 1 }],
      });
    });
  });

  describe('pinboardItemsSelector', function () {
    it('should return ids of items by types', function () {
      const state = {
        pinboard: PinboardFactory.build({
          'officer_ids': [12],
          crids: ['abc'],
          'trr_ids': [1],
        })
      };

      pinboardItemsSelector(state).should.eql({
        'OFFICER': ['12'],
        'CR': ['abc'],
        'TRR': ['1'],
      });
    });
  });

  describe('getPinboardItems selector', function () {
    it('should return transformed items by types', function () {
      const state = {
        pinboard: PinboardFactory.build({
          crItems: [{
            crid: '1000001',
            'incident_date': '2010-01-01',
            point: { 'lon': 1.0, 'lat': 1.0 },
            'most_common_category': 'Use Of Force',
          }],
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
          trrItems: [{
            id: 1,
            'trr_datetime': '2012-01-01',
            category: 'Impact Weapon',
            point: { 'lon': 1.0, 'lat': 1.0 },
          }],
        })
      };

      getPinboardItems(state).should.eql({
        'CR': [{
          id: '1000001',
          type: 'CR',
          isPinned: true,
          incidentDate: '2010-01-01',
          category: 'Use Of Force',
          point: { 'lon': 1.0, 'lat': 1.0 },
        }],
        'OFFICER': [{
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
            officerId: undefined,
            textColor: '#231F20',
            visualTokenBackground: '#ff4f13',
            year: 2016,
          },
          race: 'white',
          rank: 'Police Officer',
          sustainedCount: 0,
        }],
        TRR: [{
          id: '1',
          type: 'TRR',
          isPinned: true,
          category: 'Impact Weapon',
          trrDate: '2012-01-01',
          point: { 'lon': 1.0, 'lat': 1.0 },
        }],
      });
    });
  });
});
