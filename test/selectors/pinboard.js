import { getPinboard, pinboardItemsSelector, pinboardICRIDsSelector } from 'selectors/pinboard-page/pinboard';
import PinboardFactory from 'utils/test/factories/pinboard';


describe('Pinboard selectors', function () {
  describe('getPinboard', function () {
    it('should return correct format of null pinboard', function () {
      const state = { pinboardPage: { pinboard: null } };
      getPinboard(state).should.eql({
        id: null,
        title: '',
        officerIds: [],
        crids: [],
        trrIds: [],
        description: '',
        url: '',
        itemsCount: 0,
        isPinboardRestored: false,
      });
    });

    it('should return pinboard with correct format', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            id: 1,
            title: 'Pinboard Title',
            'officer_ids': [12],
            crids: ['abc'],
            'trr_ids': [1],
            description: 'Description',
            isPinboardRestored: false,
          })
        },
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
        isPinboardRestored: false,
      });
    });

    context('pinboard title generation', function () {
      it('should return correct format of pinboard whose title is empty', function () {
        const state = {
          pinboardPage: {
            pinboard: PinboardFactory.build({
              id: 1,
              title: '',
              'officer_ids': [12],
              crids: ['abc'],
              'trr_ids': [1],
              description: 'Description',
              isPinboardRestored: false,
            })
          },
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
          isPinboardRestored: false,
        });
      });

      it('should return correct format of pinboard whose title is undefined', function () {
        const state = {
          pinboardPage: {
            pinboard: PinboardFactory.build({
              id: 1,
              title: undefined,
              'officer_ids': [12],
              crids: ['abc'],
              'trr_ids': [1],
              description: 'Description',
              isPinboardRestored: false,
            })
          },
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
          isPinboardRestored: false,
        });
      });
    });
  });

  describe('pinboardItemsSelector', function () {
    it('should return ids of items by types', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [12],
            crids: ['abc'],
            'trr_ids': [1],
          })
        }
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
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [12],
            crids: ['abc', 'def'],
            'trr_ids': [1],
          })
        }
      };

      pinboardICRIDsSelector(state).should.eql(['abc', 'def']);
    });
  });
});
