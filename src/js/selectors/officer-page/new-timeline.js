import { concat, difference, filter, get, includes, isEmpty, nth, rangeRight, slice, values } from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

import { NEW_TIMELINE_FILTERS, NEW_TIMELINE_ITEMS, ATTACHMENT_TYPES } from 'utils/constants';
import { imgUrl } from 'utils/static-assets';


const getSelectedFilter = (state) => get(state, 'officerPage.newTimeline.filter', '');
export const getItems = (state) => get(state, 'officerPage.newTimeline.items', []);


export const baseTransform = (item, index) => {
  const unitName = item['unit_name'] ? `Unit ${item['unit_name']}` : 'Unassigned';
  const rank = get(item, 'rank', 'Unassigned');

  return {
    year: moment(item.date).year(),
    date: moment(item.date).format('MMM D').toUpperCase(),
    kind: item.kind,
    rank: rank,
    rankDisplay: item.rank,
    unitName: unitName,
    unitDescription: item['unit_description'],
    unitDisplay: unitName,
    isFirstRank: false,
    isLastRank: false,
    isFirstUnit: false,
    isLastUnit: false,
    isCurrentUnit: false,
    isMutual: false,
    isFirstMutual: false,
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

export const yearItem = (baseItem, year, hasData) => ({
  rank: baseItem.rank,
  rankDisplay: baseItem.rankDisplay,
  unitName: baseItem.unitName,
  unitDescription: baseItem.unitDescription,
  unitDisplay: baseItem.unitDisplay,
  isCurrentUnit: baseItem.isCurrentUnit,
  isFirstRank: false,
  isLastRank: false,
  isFirstUnit: false,
  isLastUnit: false,
  kind: NEW_TIMELINE_ITEMS.YEAR,
  date: `${year}`,
  key: `${baseItem.key}-${NEW_TIMELINE_ITEMS.YEAR}-${year}`,
  hasData,
});

export const gapYearItems = (fromItem, toItem) => {
  let years = rangeRight(toItem.year, fromItem.year);
  years = slice(years, 0, years.length - 1);

  return years.map((year) => yearItem(toItem, year, false));
};

export const fillYears = (items) => {
  let newItems = [];
  newItems.push(yearItem(items[0], items[0].year, true));

  items.map((currentItem, index) => {
    newItems.push(currentItem);

    if (index < items.length - 1) {
      const nextItem = items[index + 1];
      newItems = newItems.concat(gapYearItems(currentItem, nextItem));
      if (nextItem.year < currentItem.year) {
        newItems.push(yearItem(nextItem, nextItem.year, true));
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

export const dedupeRank = (items) => {
  return items.map((currentItem, index) => {
    if (index > 0) {
      const previousItem = items[index - 1];
      if (currentItem.rank === previousItem.rank) {
        currentItem.rankDisplay = ' ';
      }
    }
    return currentItem;
  });
};

export const dedupeUnit = (items) => {
  return items.map((currentItem, index) => {
    if (index > 0) {
      const previousItem = items[index - 1];
      if (currentItem.unitDescription === previousItem.unitDescription) {
        currentItem.unitDisplay = ' ';
      }
    }
    return currentItem;
  });
};

export const markFirstAndLastUnit = (items) => {
  items[0].isFirstUnit = true;
  items[items.length - 1].isLastUnit = true;
  items.map((item, index) => {
    if (item.kind === NEW_TIMELINE_ITEMS.UNIT_CHANGE) {
      if (index - 1 >= 0) {
        items[index - 1].isLastUnit = true;
      }
      items[index + 1].isFirstUnit = true;
    }
  });
  return items;
};

export const markFirstAndLastRank = (items) => {
  items[0].isFirstRank = true;
  items[items.length - 1].isLastRank = true;
  items.map((item, index) => {
    if (item.kind === NEW_TIMELINE_ITEMS.RANK_CHANGE) {
      if (index - 1 >= 0) {
        items[index - 1].isLastRank = true;
      }
      items[index + 1].isFirstRank = true;
    }
  });
  return items;
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

const removableKinds = [NEW_TIMELINE_ITEMS.CR, NEW_TIMELINE_ITEMS.FORCE, NEW_TIMELINE_ITEMS.AWARD];
const unremovableKinds = difference(values(NEW_TIMELINE_ITEMS), removableKinds);

const filteredKindsMap = {
  [NEW_TIMELINE_FILTERS.CRS]: [NEW_TIMELINE_ITEMS.CR],
  [NEW_TIMELINE_FILTERS.FORCE]: [NEW_TIMELINE_ITEMS.FORCE],
  [NEW_TIMELINE_FILTERS.AWARDS]: [NEW_TIMELINE_ITEMS.AWARD],
  [NEW_TIMELINE_FILTERS.ALL]: removableKinds,
};

export const applyFilter = (selectedFilter, items) => {
  const filteredKinds = filteredKindsMap[selectedFilter];
  const displayKinds = concat(unremovableKinds, filteredKinds);

  return filter(items, (item) => includes(displayKinds, item.kind));
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
  const latestRank = items[0] ? items[0].unitName : undefined;

  let inLastRankPeriod = true;

  return items.map((item) => {
    if (item.kind === NEW_TIMELINE_ITEMS.RANK_CHANGE) {
      inLastRankPeriod = false;
    }
    item.isCurrentRank = inLastRankPeriod && item.rank === latestRank;
    return item;
  });
};

export const markMutualRankUnit = (items) => {
  return items.map((item, index) => {
    if (
      item.kind === NEW_TIMELINE_ITEMS.UNIT_CHANGE && item.isLastRank
      || item.kind === NEW_TIMELINE_ITEMS.RANK_CHANGE && item.isLastUnit
    ) {
      item.isMutual = true;
      item.isFirstMutual = true;
      item.isFirstUnit = false;
      item.isFirstRank = false;
      item.isLastUnit = false;
      item.isLastRank = false;
      if (index - 1 >= 0) {
        items[index - 1].isLastRank = true;
        items[index - 1].isLastUnit = true;
      }
    }
    else if (
      item.kind === NEW_TIMELINE_ITEMS.RANK_CHANGE && item.isFirstUnit
      || item.kind === NEW_TIMELINE_ITEMS.UNIT_CHANGE && item.isFirstRank
    ) {
      item.isMutual = true;
      item.isFirstUnit = false;
      item.isFirstRank = false;
      item.isLastUnit = false;
      item.isLastRank = false;
      if (index + 1 < items.length) {
        items[index + 1].isFirstUnit = true;
        items[index + 1].isFirstRank = true;
        items[index + 1].rankDisplay = items[index + 1].rank;
        items[index + 1].unitDisplay = items[index + 1].unitName;
      }
    }
    return item;
  });
};


export const newTimelineItemsSelector = createSelector(
  getItems,
  getSelectedFilter,
  (items, filter) => {
    const preProcessors = [
      markLatestRank,
      markLatestUnit,
    ];

    const preProcessedItems = preProcessors.reduce((accItems, processor) => processor(accItems), items);
    const transformedItems = preProcessedItems.map(transform);
    const filteredItems = applyFilter(filter, transformedItems);
    if (isEmpty(filteredItems)) {
      return [];
    }
    // Do not change the order of these processors
    const postProcessors = [
      fillYears,
      fillEmptyItems,
      dedupeRank,
      dedupeUnit,
      markFirstAndLastRank,
      markFirstAndLastUnit,
      fillRankChange,
      fillUnitChange,
      markMutualRankUnit,
    ];

    return postProcessors.reduce((accItems, processor) => processor(accItems), filteredItems);
  }
);
