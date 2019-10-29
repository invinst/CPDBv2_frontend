import {
  allPinboardsSelector,
  hasMoreSelector,
  nextParamsSelector,
} from 'selectors/pinboard-admin-page';


describe('pinboardAdminPages selectors', function () {
  describe('allPinboards', function () {
    it('should return pinboards with correct format', function () {
      const state = {
        pinboardAdminPage: {
          allPinboards: {
            items: [
              {
                'id': '197dcdc7',
                'title': 'My pinboard',
                'description': '',
                'created_at': '2019-10-25',
                'officers_count': 7,
                'allegations_count': 7,
                'trrs_count': 0,
              },
              {
                'id': '361ee7cc',
                'title': '',
                'description': '',
                'created_at': '2019-10-25',
                'officers_count': 1,
                'allegations_count': 0,
                'trrs_count': 0,
              },
              {
                'id': 'c6c9ac12',
                'title': '',
                'description': '',
                'created_at': '2019-09-30',
                'officers_count': 4,
                'allegations_count': 4,
                'trrs_count': 4,
              },
            ],
          },
        },
      };

      allPinboardsSelector(state).should.eql([
        {
          id: '10-2019',
          text: 'Oct 2019',
          kind: 'MONTH_SEPARATOR',
        },
        {
          id: '197dcdc7',
          title: 'My pinboard',
          createdAt: 'Oct 25',
          pinnedCount: '7 officers, 7 allegations and 0 TRRS',
          kind: 'PINBOARD',
        },
        {
          id: '361ee7cc',
          title: 'Untitled Pinboard',
          createdAt: 'Oct 25',
          pinnedCount: '1 officer, 0 allegations and 0 TRRS',
          kind: 'PINBOARD',
        },
        {
          id: '09-2019',
          text: 'Sep 2019',
          kind: 'MONTH_SEPARATOR',
        },
        {
          id: 'c6c9ac12',
          title: 'Untitled Pinboard',
          createdAt: 'Sep 30',
          pinnedCount: '4 officers, 4 allegations and 4 TRRS',
          kind: 'PINBOARD',
        },
      ]);
    });
  });

  describe('pinboardAdminPages nextParamsSelector', function () {
    it('should extract pagination information from next parameter', function () {
      const state = {
        pinboardAdminPage: {
          allPinboards: {
            pagination: {
              next: '/pinboards/all/?limit=20&offset=40',
            },
          },
        },
      };

      nextParamsSelector(state).should.eql({
        limit: '20',
        offset: '40',
      });
    });
  });

  describe('pinboardAdminPages hasMoreSelector', function () {
    it('should return true when not loaded all items', function () {
      const state = {
        pinboardAdminPage: {
          allPinboards: {
            items: [
              { id: 'aaaa1111' },
              { id: 'bbbb2222' },
              { id: 'cccc3333' },
              { id: 'dddd4444' },
              { id: 'eeee5555' },
            ],
            count: 10,
          },
        },
      };

      hasMoreSelector(state).should.be.true();
    });

    it('should return false when already loaded all items', function () {
      const state = {
        pinboardAdminPage: {
          allPinboards: {
            items: [
              { id: 'aaaa1111' },
              { id: 'bbbb2222' },
              { id: 'cccc3333' },
              { id: 'dddd4444' },
              { id: 'eeee5555' },
            ],
            pagination: {
              count: 5,
            },
          },
        },
      };

      hasMoreSelector(state).should.be.false();
    });
  });
});
