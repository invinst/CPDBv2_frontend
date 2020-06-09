import {
  pinboardsSelector,
  getShowPinboardsList,
} from 'selectors/pinboard-page/pinboards';


describe('Pinboards selectors', function () {
  describe('pinboardsSelector', function () {
    it('should return pinboards with correct format', function () {
      const state = {
        pinboardPage: {
          pinboards: [
            {
              'id': 1,
              'title': 'Pinboard Title',
              'created_at': '2019-09-12',
            },
            {
              'id': 2,
              'title': '',
              'created_at': '2019-10-15',
            },
          ],
          pinboard: {
            id: 1,
          },
        },
      };

      pinboardsSelector(state).should.eql([
        {
          id: '1',
          title: 'Pinboard Title',
          createdAt: 'Sep 12, 2019',
          url: '/pinboard/1/pinboard-title/',
          isCurrent: true,
        },
        {
          id: '2',
          title: '',
          createdAt: 'Oct 15, 2019',
          url: '/pinboard/2/untitled-pinboard/',
          isCurrent: false,
        },
      ]);
    });
  });

  describe('getShowPinboardsList', function () {
    it('should return getShowPinboardsList', function () {
      const state = {
        pinboardPage: {
          isShownPinboardsList: true,
        },
      };

      getShowPinboardsList(state).should.be.true();
    });
  });
});
