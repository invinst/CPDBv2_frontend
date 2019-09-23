import {
  difference,
  filter,
  get,
  includes,
  isEmpty,
  nth,
  rangeRight,
  slice,
  values,
  cloneDeep,
  map,
  keys,
  every,
} from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

import { NEW_TIMELINE_FILTERS, NEW_TIMELINE_ITEMS, ATTACHMENT_TYPES } from 'utils/constants';
import { imgUrl } from 'utils/static-assets';


export const getSelectedFilter = (state) => get(state, 'officerPage.newTimeline.filter', {});
export const getItems = (state) => get(state, 'officerPage.newTimeline.items', []);


export const baseTransform = (item, index) => {
  const unitName = item['unit_name'] ? `Unit ${item['unit_name']}` : 'Unassigned';
  const rank = get(item, 'rank', 'Unknown');

  return {
    year: moment(item.date).year(),
    date: moment(item.date).format('MMM D').toUpperCase(),
    kind: item.kind,
    rank,
    unitName,
    unitDescription: item['unit_description'],
    isAfterRankChange: false,
    isAfterUnitChange: false,
    isCurrentUnit: false,
    isCurrentRank: false,
    key: index,
  };
};

export const attachmentsTransform = (attachments) => {
  if (attachments) {
    return attachments.map((attachment) => {
      const fileType = attachment['file_type'];
      let previewImageUrl = attachment['preview_image_url'];
      if (fileType === ATTACHMENT_TYPES.AUDIO) {
        previewImageUrl = imgUrl('ic-audio.svg');
      } else if (fileType === ATTACHMENT_TYPES.VIDEO) {
        previewImageUrl = imgUrl('ic-video.svg');
      }
      return {
        title: attachment.title,
        url: attachment.url,
        previewImageUrl: previewImageUrl,
        fileType: fileType,
        id: attachment['id'],
      };
    });
  }
  return [];
};

export const crTransform = (item, index) => ({
  ...baseTransform(item, index),
  category: item.category,
  crid: item.crid,
  coaccused: item.coaccused,
  finding: item.finding,
  outcome: item.outcome,
  attachments: attachmentsTransform(item.attachments),
});

export const trrTransform = (item, index) => ({
  ...baseTransform(item, index),
  trrId: item['trr_id'],
  category: item['firearm_used'] ? 'Firearm' : item.taser ? 'Taser' : 'Use of Force Report',
});

export const awardTransform = (item, index) => ({
  ...baseTransform(item, index),
  category: item['award_type'],
});

const transformMap = {
  [NEW_TIMELINE_ITEMS.CR]: crTransform,
  [NEW_TIMELINE_ITEMS.FORCE]: trrTransform,
  [NEW_TIMELINE_ITEMS.JOINED]: baseTransform,
  [NEW_TIMELINE_ITEMS.UNIT_CHANGE]: baseTransform,
  [NEW_TIMELINE_ITEMS.RANK_CHANGE]: baseTransform,
  [NEW_TIMELINE_ITEMS.AWARD]: awardTransform,
};

const transform = (item, index) => transformMap[item.kind](item, index);

export const yearItem = (baseItem, year, hasData, hasFirstChangedItem) => ({
  rank: baseItem.rank,
  unitName: baseItem.unitName,
  unitDescription: baseItem.unitDescription,
  isCurrentUnit: baseItem.isCurrentUnit,
  isCurrentRank: baseItem.isCurrentRank,
  isAfterRankChange: false,
  isAfterUnitChange: false,
  kind: NEW_TIMELINE_ITEMS.YEAR,
  date: `${year}`,
  key: `${baseItem.key}-${NEW_TIMELINE_ITEMS.YEAR}-${year}`,
  hasData,
  hasFirstChangedItem,
});

export const gapYearItems = (fromItem, toItem) => {
  let years = rangeRight(toItem.year, fromItem.year);
  years = slice(years, 0, years.length - 1);

  return years.map((year) => yearItem(toItem, year, false, false));
};

export const fillYears = (items) => {
  let newItems = [];
  newItems.push(yearItem(items[0], items[0].year, true, false));

  items.map((currentItem, index) => {
    newItems.push(currentItem);

    if (index < items.length - 1) {
      const nextItem = items[index + 1];
      newItems = newItems.concat(gapYearItems(currentItem, nextItem));
      if (nextItem.year < currentItem.year) {
        const specialItems = [
          NEW_TIMELINE_ITEMS.UNIT_CHANGE,
          NEW_TIMELINE_ITEMS.RANK_CHANGE,
          NEW_TIMELINE_ITEMS.JOINED,
        ];
        const hasFirstChangedItem = includes(specialItems, nextItem.kind);

        newItems.push(yearItem(nextItem, nextItem.year, true, hasFirstChangedItem));
      }
    }
  });

  return newItems;
};

const emptyItem = (baseItem) => ({
  ...baseItem,
  kind: NEW_TIMELINE_ITEMS.EMPTY,
  key: `${baseItem.key}-${NEW_TIMELINE_ITEMS.EMPTY}`,
});

export const fillEmptyItems = (items) => {
  const newItems = [];

  items.map((item, index) => {
    newItems.push(item);

    const nextItem = nth(items, index + 1);
    if (nextItem && item.kind === NEW_TIMELINE_ITEMS.UNIT_CHANGE && nextItem.kind === NEW_TIMELINE_ITEMS.YEAR) {
      newItems.push(emptyItem(nextItem));
    }
  });

  return newItems;
};

export const fillUnitChange = (items) => {
  let previousUnitChangeItem = undefined;

  items.map((item) => {
    if (item.kind === NEW_TIMELINE_ITEMS.UNIT_CHANGE) {
      if (previousUnitChangeItem !== undefined) {
        previousUnitChangeItem.oldUnitName = item.unitName;
        previousUnitChangeItem.oldUnitDescription = item.unitDescription;
      }

      previousUnitChangeItem = item;
    }
  });

  const lastUnitChangeItem = previousUnitChangeItem;

  if (lastUnitChangeItem !== undefined) {
    lastUnitChangeItem.oldUnitName = items[items.length - 1].unitName;
    lastUnitChangeItem.oldUnitDescription = items[items.length - 1].unitDescription;
  }
  return items;
};

export const fillRankChange = (items) => {
  let previousRankChangeItem = undefined;

  items.map((item) => {
    if (item.kind === NEW_TIMELINE_ITEMS.RANK_CHANGE) {
      if (previousRankChangeItem !== undefined) {
        previousRankChangeItem.oldRank = item.rank;
      }

      previousRankChangeItem = item;
    }
  });

  const lastRankChangeItem = previousRankChangeItem;

  if (lastRankChangeItem !== undefined) {
    lastRankChangeItem.oldRank = items[items.length - 1].rank;
  }
  return items;
};

export const applyFilter = (selectedFilter, items) => {
  const allKinds = values(NEW_TIMELINE_ITEMS);
  const alwaysShownKinds = difference(allKinds, NEW_TIMELINE_FILTERS.ALL.kind);

  const keptKinds = selectedFilter.kind || allKinds;
  const criteria = difference(keys(selectedFilter), ['label', 'kind']);
  const matchCriteria = item => includes(keptKinds, item.kind) &&
      every(criteria.map(criterion => includes(selectedFilter[criterion], item[criterion])));

  return filter(items, item => includes(alwaysShownKinds, item.kind) || matchCriteria(item));
};

export const markLatestUnit = (items) => {
  const latestUnit = items[0] ? items[0].unitName : undefined;

  let inLastUnitPeriod = true;

  return items.map((item) => {
    if (item.kind === NEW_TIMELINE_ITEMS.UNIT_CHANGE) {
      inLastUnitPeriod = false;
    }
    item.isCurrentUnit = inLastUnitPeriod && item.unitName === latestUnit;
    return item;
  });
};

export const markLatestRank = (items) => {
  const latestRank = items[0] ? items[0].rank : undefined;

  let inLastRankPeriod = true;

  return items.map((item) => {
    if (item.kind === NEW_TIMELINE_ITEMS.RANK_CHANGE) {
      inLastRankPeriod = false;
    }
    item.isCurrentRank = inLastRankPeriod && item.rank === latestRank;
    return item;
  });
};

export const markIsAfterRankUnitChange = (items) => {
  return items.map((item, index) => {
    if (index + 1 < items.length) {
      if (items[index + 1].kind === NEW_TIMELINE_ITEMS.RANK_CHANGE) {
        items[index].isAfterRankChange = true;
      }
      if (items[index + 1].kind === NEW_TIMELINE_ITEMS.UNIT_CHANGE) {
        items[index].isAfterUnitChange = true;
      }
    }

    return item;
  });
};


export const newTimelineItemsSelector = createSelector(
  getItems,
  getSelectedFilter,
  (items, filter) => {
    const transformedItems = items.map(transform);

    const preProcessors = [
      markLatestRank,
      markLatestUnit,
    ];
    const preProcessedItems = preProcessors.reduce((accItems, processor) => processor(accItems), transformedItems);

    const filteredItems = applyFilter(filter, preProcessedItems);
    if (isEmpty(filteredItems)) {
      return [];
    }
    // Do not change the order of these processors
    const postProcessors = [
      fillYears,
      fillEmptyItems,
      fillRankChange,
      fillUnitChange,
      markIsAfterRankUnitChange,
    ];

    return postProcessors.reduce((accItems, processor) => processor(accItems), filteredItems);
  }
);

export const filterCountSelector = createSelector(
  getItems,
  items => {
    let count = cloneDeep(NEW_TIMELINE_FILTERS);
    let CLONE_NEW_TIMELINE_FILTERS = cloneDeep(NEW_TIMELINE_FILTERS);

    map(CLONE_NEW_TIMELINE_FILTERS, filter => delete filter.label);

    Object.keys(count).map(key => {
      count[key] = 0;
      items.map(item => {
        let excluded = false;
        map(CLONE_NEW_TIMELINE_FILTERS[key], (filter, subKey) => {
          if (!includes(filter, item[subKey])) {
            excluded = true;
          }
        });
        if (!excluded) {
          count[key]++;
        }
      });
    });

    return count;
  }
);
