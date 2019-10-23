import { createSelector } from 'reselect';
import { get, each, map } from 'lodash';
import moment from 'moment';

import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';
import extractQuery from 'utils/extract-query';


export const getAllPinboardsPagination = state => state.pinboardAdminPage.allPinboards;

const pinboardTransform = pinboard => ({
  id: get(pinboard, 'id', null) !== null ? pinboard['id'].toString() : null,
  title: pinboard.title || 'Untitled Pinboard',
  createdAt: moment(pinboard['created_at']).format('MMM DD'),
  officersCount: pinboard['officers_count'],
  allegationsCount: pinboard['allegations_count'],
  trrsCount: pinboard['trrs_count'],
  kind: PINBOARDS_SEARCH_ITEMS.PINBOARD,
});

export const allPinboardsSelector = createSelector(
  getAllPinboardsPagination,
  ({ items: pinboards }) => {
    let results = [];
    let prevDate = null;
    each(pinboards, pinboard => {
      const date = moment(pinboard['created_at']);
      if (prevDate === null || date.month() !== prevDate.month() || date.year() !== prevDate.year()) {
        results.push({
          kind: PINBOARDS_SEARCH_ITEMS.MONTH_SEPARATOR,
          text: date.format('MMM YYYY'),
          id: date.format('MM-YYYY'),
        });
      }
      prevDate = date;
      results.push(pinboardTransform(pinboard));
    });
    return results;
  }
);

const allPinboardsCountSelector = createSelector(
  getAllPinboardsPagination,
  ({ count }) => count
);

export const allPinboardsNextParamsSelector = createSelector(
  getAllPinboardsPagination,
  ({ pagination }) => extractQuery(pagination.next)
);

export const allPinboardsHasMoreSelector = createSelector(
  allPinboardsCountSelector,
  getAllPinboardsPagination,
  (count, { items: pinboards }) => pinboards.length < count
);
