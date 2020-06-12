import { useFakeTimers } from 'sinon';
import moment from 'moment';

import {
  pinboardsSelector,
  getShowPinboardsList,
} from 'selectors/pinboard-page/pinboards';
import { PINBOARD_VIEWED_DATE_TIME_FORMAT } from 'utils/constants';


describe('Pinboards selectors', function () {
  describe('pinboardsSelector', function () {
    it('should return pinboards with correct format', function () {
      useFakeTimers();
      const currentTime = moment().format(PINBOARD_VIEWED_DATE_TIME_FORMAT);
      const state = {
        pinboardPage: {
          pinboards: [
            {
              'id': 1,
              'title': 'Pinboard Title',
              'created_at': '2019-09-12',
              'last_viewed_at': '2019-09-16T09:30:00',
            },
            {
              'id': 2,
              'title': '',
              'created_at': '2019-10-15',
              'last_viewed_at': '2019-10-16T09:45:00',
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
          createdAt: '12/09/2019',
          lastViewedAt: currentTime,
          url: '/pinboard/1/pinboard-title/',
          isCurrent: true,
        },
        {
          id: '2',
          title: '',
          createdAt: '15/10/2019',
          lastViewedAt: '16/10/2019 at 09:45 AM',
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
