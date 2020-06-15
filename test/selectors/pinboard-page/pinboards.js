import moment from 'moment';

import {
  pinboardsSelector,
  getShowPinboardsList,
} from 'selectors/pinboard-page/pinboards';


describe('Pinboards selectors', function () {
  describe('pinboardsSelector', function () {
    context('creatingNewPinboard is true', function () {
      it('should return correct values', function () {
        const state = {
          pinboardPage: {
            pinboards: [
              {
                'id': '23ffd689',
                'title': 'Watts Crew',
                'created_at': '2020-05-06',
                'last_viewed_at': '2019-03-16T10:15:00',
              },
              {
                'id': '7e1e3c88',
                'title': '',
                'created_at': '2020-05-07',
                'last_viewed_at': '2019-03-16T09:45:30',
              },
              {
                'id': '3a160339',
                'title': '',
                'created_at': '2020-05-08',
                'last_viewed_at': '2019-03-16T09:30:00',
              },
              {
                'id': 'c04ba6f6',
                'title': '',
                'created_at': '2020-05-09',
                'last_viewed_at': '2019-03-16T09:05:00',
              },
            ],
            pinboard: {
              'id': '7e1e3c88',
              'title': 'Updated',
              'created_at': '2020-05-07',
              'last_viewed_at': '2019-03-16T11:45:30',
              'hasPendingChanges': true,
              'hasTitlePendingChange': true,
            },
            creatingNewPinboard: true,
          },
        };
        const currentTimeString = moment().format('DD/MM/YYYY [at] hh:mm A');
        pinboardsSelector(state).should.eql([
          {
            hasPendingChanges: true,
            isCurrent: true,
            key: 'new-pinboard',
            title: 'Adding pinboard...',
          },
          {
            id: '7e1e3c88',
            key: '7e1e3c88',
            title: 'Updated',
            createdAt: '07/05/2020',
            url: '/pinboard/7e1e3c88/updated/',
            lastViewedAt: currentTimeString,
            isCurrent: false,
            hasPendingChanges: true,
            hasTitlePendingChange: true,
          },
          {
            id: '23ffd689',
            key: '23ffd689',
            title: 'Watts Crew',
            createdAt: '06/05/2020',
            url: '/pinboard/23ffd689/watts-crew/',
            lastViewedAt: '16/03/2019 at 10:15 AM',
            isCurrent: false,
            hasPendingChanges: undefined,
            hasTitlePendingChange: undefined,
          },
          {
            id: '3a160339',
            key: '3a160339',
            title: '',
            createdAt: '08/05/2020',
            url: '/pinboard/3a160339/untitled-pinboard/',
            lastViewedAt: '16/03/2019 at 09:30 AM',
            isCurrent: false,
            hasPendingChanges: undefined,
            hasTitlePendingChange: undefined,
          },
          {
            id: 'c04ba6f6',
            key: 'c04ba6f6',
            title: '',
            createdAt: '09/05/2020',
            url: '/pinboard/c04ba6f6/untitled-pinboard/',
            lastViewedAt: '16/03/2019 at 09:05 AM',
            isCurrent: false,
            hasPendingChanges: undefined,
            hasTitlePendingChange: undefined,
          },
        ]);
      });
    });

    context('creatingNewPinboard is false', function () {
      it('should return correct values', function () {
        const state = {
          pinboardPage: {
            pinboards: [
              {
                'id': '23ffd689',
                'title': 'Watts Crew',
                'created_at': '2020-05-06',
                'last_viewed_at': '2019-03-16T10:15:00',
              },
              {
                'id': '7e1e3c88',
                'title': '',
                'created_at': '2020-05-07',
                'last_viewed_at': '2019-03-16T09:45:30',
              },
              {
                'id': '3a160339',
                'title': '',
                'created_at': '2020-05-08',
                'last_viewed_at': '2019-03-16T09:30:00',
              },
              {
                'id': 'c04ba6f6',
                'title': '',
                'created_at': '2020-05-09',
                'last_viewed_at': '2019-03-16T09:05:00',
              },
            ],
            pinboard: {
              'id': '7e1e3c88',
              'title': 'Updated',
              'created_at': '2020-05-07',
              'last_viewed_at': '2019-03-16T11:45:30',
              'hasPendingChanges': true,
              'hasTitlePendingChange': true,
            },
            creatingNewPinboard: false,
          },
        };
        const currentTimeString = moment().format('DD/MM/YYYY [at] hh:mm A');
        pinboardsSelector(state).should.eql([
          {
            id: '7e1e3c88',
            key: '7e1e3c88',
            title: 'Updated',
            createdAt: '07/05/2020',
            url: '/pinboard/7e1e3c88/updated/',
            lastViewedAt: currentTimeString,
            isCurrent: true,
            hasPendingChanges: true,
            hasTitlePendingChange: true,
          },
          {
            id: '23ffd689',
            key: '23ffd689',
            title: 'Watts Crew',
            createdAt: '06/05/2020',
            url: '/pinboard/23ffd689/watts-crew/',
            lastViewedAt: '16/03/2019 at 10:15 AM',
            isCurrent: false,
            hasPendingChanges: undefined,
            hasTitlePendingChange: undefined,
          },
          {
            id: '3a160339',
            key: '3a160339',
            title: '',
            createdAt: '08/05/2020',
            url: '/pinboard/3a160339/untitled-pinboard/',
            lastViewedAt: '16/03/2019 at 09:30 AM',
            isCurrent: false,
            hasPendingChanges: undefined,
            hasTitlePendingChange: undefined,
          },
          {
            id: 'c04ba6f6',
            key: 'c04ba6f6',
            title: '',
            createdAt: '09/05/2020',
            url: '/pinboard/c04ba6f6/untitled-pinboard/',
            lastViewedAt: '16/03/2019 at 09:05 AM',
            isCurrent: false,
            hasPendingChanges: undefined,
            hasTitlePendingChange: undefined,
          },
        ]);
      });
    });
  });

  describe('getShowPinboardsList', function () {
    it('should return correct value', function () {
      getShowPinboardsList({
        pinboardPage: {
          isShownPinboardsList: true,
        },
      }).should.be.true();
      getShowPinboardsList({
        pinboardPage: {
          isShownPinboardsList: false,
        },
      }).should.be.false();
    });
  });
});
