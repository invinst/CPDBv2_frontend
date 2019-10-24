import {
  getPinboard,
  pinboardSavingSelector,
  pinboardItemsSelector,
  pinboardICRIDsSelector,
  isEmptyPinboardSelector,
  examplePinboardsSelector,
  isItemPinned,
} from 'selectors/pinboard-page/pinboard';
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
          }),
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
            }),
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
            }),
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

  describe('pinboardSavingSelector', function () {
    it('should return false of null pinboard', function () {
      const state = { pinboardPage: { pinboard: null } };
      pinboardSavingSelector(state).should.be.false();
    });

    it('should return pinboard saving value', function () {
      let state = {
        pinboardPage: {
          pinboard: {
            saving: true,
          },
        },
      };

      pinboardSavingSelector(state).should.be.true();

      state = {
        pinboardPage: {
          pinboard: {
            saving: false,
          },
        },
      };

      pinboardSavingSelector(state).should.be.false();
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
          }),
        },
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
          }),
        },
      };

      pinboardICRIDsSelector(state).should.eql(['abc', 'def']);
    });
  });

  describe('isEmptyPinboardSelector', function () {
    it('should return false if there is some crid', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: ['abc'],
            'trr_ids': [],
          }),
        },
      };

      isEmptyPinboardSelector(state).should.be.false();
    });

    it('should return false if there is some officer id', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [1],
            crids: [],
            'trr_ids': [],
          }),
        },
      };

      isEmptyPinboardSelector(state).should.be.false();
    });

    it('should return false if there is some trr id', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [1],
          }),
        },
      };

      isEmptyPinboardSelector(state).should.be.false();
    });

    it('should return true if there is no trr, cr or officer', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [],
          }),
        },
      };

      isEmptyPinboardSelector(state).should.be.true();
    });
  });

  describe('examplePinboardsSelector', function () {
    it('should return example pinboards with id, title and description', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [],
            'example_pinboards': [{
              id: '66ef1561',
              title: 'Pinboard 1',
              description: 'Description 1',
            }, {
              id: '66ef1562',
              title: 'Pinboard 2',
              description: 'Description 2',
            }],
          }),
        },
      };

      examplePinboardsSelector(state).should.eql([{
        id: '66ef1561',
        title: 'Pinboard 1',
        description: 'Description 1',
      }, {
        id: '66ef1562',
        title: 'Pinboard 2',
        description: 'Description 2',
      }]);
    });

    it('should return empty if no data', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [],
          }),
        },
      };

      examplePinboardsSelector(state).should.eql([]);
    });
  });

  describe('isItemPinned', function () {
    const pinboardItems = {
      'OFFICER': ['8562', '8563'],
      'CR': ['C12345'],
      'TRR': [],
    };

    it('should return true if item was added to pinboard', function () {
      isItemPinned('OFFICER', 8562, pinboardItems).should.be.true();
    });

    it('should return false if item was not added to pinboard', function () {
      isItemPinned('CR', '123456', pinboardItems).should.be.false();
    });
  });
});
