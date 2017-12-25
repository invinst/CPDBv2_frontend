import { createSelector } from 'reselect';
import S from 'string';
import moment from 'moment';
import { serializeFilterParams } from 'utils/location';

import { sortBy, keys, map, mapKeys, reverse, groupBy } from 'lodash';

import extractQuery from 'utils/extract-query';
import { TimelineItemType } from 'utils/constants';

export const getTimelineFilters = state => state.officerPage.timeline.filters;
const getTimelineNextUrl = state => state.officerPage.timeline.pagination.next;
const getTimelineIsRequesting = state => state.officerPage.timeline.isRequesting;
const getMinimap = state => state.officerPage.timeline.minimap.minimap;

export const getTimelineItems = state => state.officerPage.timeline.items;
export const getSelectedItemIndex = state => state.officerPage.timeline.selectedItemIndex;
export const getHoveredItemIndex = state => state.officerPage.timeline.hoveredItemIndex;
export const getSortDescending = state => state.officerPage.timeline.sortDescending;

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
  CR: TimelineItemType.CR,
  JOINED: TimelineItemType.JOINED,
  UNIT_CHANGE: TimelineItemType.UNIT
};

export const timelineItemsSelector = createSelector(
  [getTimelineItems],
  (items) => (map(items, (item) => ({
    ...mapKeys(item, (val, key) => S(key).camelize().s),
    date: item.date ? moment(item.date).format('ll').toUpperCase() : null,
    kind: mapping[item.kind]
  })))
);

export const minimapSelector = createSelector(
  [getMinimap, getSortDescending],
  (minimap, sortDescending) => {
    if (!sortDescending) {
      minimap = reverse([...minimap]);
    }

    minimap = map(minimap, (item, index) => ({
      ...item,
      index
    }));

    const minimapItems = groupBy(minimap, 'year');

    return sortBy(map(keys(minimapItems), key => {
      return {
        year: key,
        items: minimapItems[key]
      };
    }), obj => sortDescending ? -obj.year : obj.year);
  }
);

export const sortParamsSelector = createSelector(
  [getSortDescending],
  (sortDescending) => sortDescending ? {} : { sort: 'asc' }
);

export const timelineUrlParamsSelector = createSelector(
  [getTimelineFilters],
  (filters) => {
    return serializeFilterParams(filters, '?');
  }
);
