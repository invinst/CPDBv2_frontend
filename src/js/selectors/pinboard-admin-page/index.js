import pluralize from 'pluralize';
import { createSelector } from 'reselect';
import { each } from 'lodash';
import moment from 'moment';

import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';
import extractQuery from 'utils/extract-query';


export const getAllPinboards = state => state.pinboardAdminPage.allPinboards;

export const nextParamsSelector = createSelector(
  getAllPinboards,
  pinboards => extractQuery(pinboards.pagination.next)
);

export const hasMoreSelector = createSelector(
  getAllPinboards,
  pinboards => pinboards.items.length < pinboards.count
);

const pinboardTransform = pinboard => ({
  id: pinboard.id,
  title: pinboard.title || 'Untitled Pinboard',
  createdAt: moment(pinboard['created_at']).format('MMM DD'),
  pinnedCount: (
    `${ pluralize('officer', pinboard['officers_count'], true) }, ` +
    `${ pluralize('allegation', pinboard['allegations_count'], true) } and ` +
    `${ pluralize('TRR', pinboard['trrs_count'], true) }`
  ),
  kind: PINBOARDS_SEARCH_ITEMS.PINBOARD,
});

export const allPinboardsSelector = createSelector(
  getAllPinboards,
  ({ items: pinboards }) => {
    let results = [];
    let prevDate = null;
    each(pinboards, pinboard => {
      const date = moment(pinboard['created_at']);
      if (prevDate === null || date.month() !== prevDate.month() || date.year() !== prevDate.year()) {
        results.push({
          id: date.format('MM-YYYY'),
          text: date.format('MMM YYYY'),
          kind: PINBOARDS_SEARCH_ITEMS.MONTH_SEPARATOR,
        });
      }
      prevDate = date;
      results.push(pinboardTransform(pinboard));
    });
    return results;
  }
);
