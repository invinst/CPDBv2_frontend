import { getPinboard, pinboardItemsSelector, pinboardICRIDsSelector } from 'selectors/pinboard';
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
        ownedByCurrentUser: false,
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
          ownedByCurrentUser: true,
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
        ownedByCurrentUser: true,
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
          ownedByCurrentUser: true,
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
        ownedByCurrentUser: true,
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

  describe('pinboardICRIDsSelector', function () {
    it('should return pined crids', function () {
      const state = {
        pinboard: PinboardFactory.build({
          'officer_ids': [12],
          crids: ['abc', 'def'],
          'trr_ids': [1],
        })
      };

      pinboardICRIDsSelector(state).should.eql(['abc', 'def']);
    });
  });
});
