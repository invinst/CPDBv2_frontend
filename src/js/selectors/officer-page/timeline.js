import { createSelector } from 'reselect';
import S from 'string';
import moment from 'moment';

import { reduce, sortBy, keys, map, mapKeys } from 'lodash';

import extractQuery from 'utils/extract-query';
import { TimelineItemType } from 'utils/constants';

const getTimelineNextUrl = state => state.officerPage.timeline.pagination.next;
const getTimelineIsRequesting = state => state.officerPage.timeline.isRequesting;
const getTimelineItems = state => state.officerPage.timeline.items;
const getMinimap = state => state.officerPage.timeline.minimap.minimap;

export const sortDescendingSelector = state => state.officerPage.timeline.sortDescending;

export const timelineItemsHasMoreSelector = createSelector(
  [getTimelineNextUrl, getTimelineIsRequesting],
  (nextUrl, isRequesting) => {
    return !!nextUrl && !isRequesting;
  }
);

export const timelineItemsNextParamsSelector = createSelector(
  [getTimelineNextUrl],
  (nextUrl) => {
    return extractQuery(nextUrl);
  }
);

const mapping = {
  cr: TimelineItemType.CR,
  year: TimelineItemType.YEAR,
  joined: TimelineItemType.JOINED,
  unit: TimelineItemType.UNIT
};

export const timelineItemsSelector = createSelector(
  [getTimelineItems],
  (items) => map(items, item => ({
    ...mapKeys(item, (val, key) => S(key).camelize().s),
    date: item.date ? moment(item.date).format('ll').toUpperCase() : null,
    kind: mapping[item.kind]
  }))
);

export const minimapSelector = createSelector(
  [getMinimap],
  (minimap) => {
    const minimapItems = reduce(minimap, (result, item) => {
      (result[item['year']] || (result[item['year']] = [])).push(item['kind']);
      return result;
    }, {});

    return sortBy(map(keys(minimapItems), key => {
      return { year: key, items: minimapItems[key] };
    }), obj => -obj.year);
  }
);
