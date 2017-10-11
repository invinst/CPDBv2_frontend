import { createSelector } from 'reselect';
import S from 'string';
import moment from 'moment';
import { serializeFilterParams } from 'utils/location';

import { reduce, sortBy, keys, map, mapKeys, reverse } from 'lodash';

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
  YEAR: TimelineItemType.YEAR,
  JOINED: TimelineItemType.JOINED,
  UNIT_CHANGE: TimelineItemType.UNIT
};

export const timelineItemsSelector = createSelector(
  [getTimelineItems, getTimelineFilters],
  (items, filters) => {
    return items.reduce((acc, item) => {
      if (Object.keys(filters).length > 0 && item.kind === 'YEAR') {
        const filteredCrs = items.filter(i => (new Date(i.date)).getFullYear() === item.year).length;
        if (filteredCrs === 0) {
          return acc;
        }
      }

      acc.push({
        ...mapKeys(item, (val, key) => S(key).camelize().s),
        date: item.date ? moment(item.date).format('ll').toUpperCase() : null,
        kind: mapping[item.kind]
      });

      return acc;
    }, []);
  }
);

export const minimapSelector = createSelector(
  [getMinimap, getSortDescending],
  (minimap, sortDescending) => {
    if (!sortDescending) {
      minimap = reverse([...minimap]);
    }

    let currentYear = null;
    let currentIndex = sortDescending ? -1 : -2;
    minimap = map(minimap, item => {
      item = { ...item };
      if (currentYear !== item.year) {
        currentYear = item.year;
        item['index'] = currentIndex + 2;
      } else {
        item['index'] = currentIndex + 1;
      }
      currentIndex = item['index'];
      return item;
    });

    const minimapItems = reduce(minimap, (result, item) => {
      (result[item['year']] || (result[item['year']] = [])).push({ kind: item.kind, index: item.index });
      return result;
    }, {});

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
