import moment from 'moment';
import { isEmpty, rangeRight, slice, nth, filter, values, includes, concat, difference, get } from 'lodash';

import { NEW_TIMELINE_FILTERS, NEW_TIMELINE_ITEMS } from 'utils/constants';


export const getSelectedFilter = (state) => state.officerPage.newTimeline.filter;

export const baseTransform = (item, index) => {
  const unitName = item['unit_name'] ? `Unit ${item['unit_name']}` : 'Unassigned';

  return {
    year: moment(item.date).year(),
    date: moment(item.date).format('MMM D').toUpperCase(),
    kind: item.kind,
    rank: item.rank,
    rankDisplay: item.rank,
    unitName: unitName,
    unitDescription: item['unit_description'],
    unitDisplay: unitName,
    isFirstRank: false,
    isLastRank: false,
    isFirstUnit: false,
    isLastUnit: false,
    key: index,
  };
};

export const attachmentsTransform = (attachments) => {
  if (attachments) {
    return attachments.map((attachment) => ({
      title: attachment.title,
      url: attachment.url,
      previewImageUrl: attachment['preview_image_url'],
    }));
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
  [NEW_TIMELINE_ITEMS.AWARD]: awardTransform,
};

const transform = (item, index) => transformMap[item.kind](item, index);

export const yearItem = (baseItem, year, hasData) => ({
  rank: baseItem.rank,
  rankDisplay: baseItem.rankDisplay,
  unitName: baseItem.unitName,
  unitDescription: baseItem.unitDescription,
  unitDisplay: baseItem.unitDisplay,
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
  items[0].isFirstRank = true;
  items[items.length - 1].isLastRank = true;
  return items.map((item, index) => {
    if (index !== 0) {
      item.rankDisplay = ' ';
    }
    return item;
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

const removableKinds = [NEW_TIMELINE_ITEMS.CR, NEW_TIMELINE_ITEMS.FORCE, NEW_TIMELINE_ITEMS.AWARD];
const unremovableKinds = difference(values(NEW_TIMELINE_ITEMS), removableKinds);

const filteredKindsMap = {
  [NEW_TIMELINE_FILTERS.CRS]: [NEW_TIMELINE_ITEMS.CR],
  [NEW_TIMELINE_FILTERS.FORCE]: [NEW_TIMELINE_ITEMS.FORCE],
  [NEW_TIMELINE_FILTERS.AWARDS]: [NEW_TIMELINE_ITEMS.AWARD],
  [NEW_TIMELINE_FILTERS.ALL]: removableKinds,
};

const applyFilter = (selectedFilter, items) => {
  const filteredKinds = filteredKindsMap[selectedFilter];
  const displayKinds = concat(unremovableKinds, filteredKinds);

  return filter(items, (item) => includes(displayKinds, item.kind));
};

export const getNewTimelineItems = state => {
  const items = get(state.officerPage.newTimeline, 'items', []);

  const transformedItems = items.map(transform);
  const filteredItems = applyFilter(getSelectedFilter(state), transformedItems);
  if (isEmpty(filteredItems)) {
    return [];
  }
  // Do not change the order of these processors
  const processors = [fillYears, fillEmptyItems, dedupeRank, dedupeUnit, markFirstAndLastUnit, fillUnitChange];

  return processors.reduce((accItems, processor) => processor(accItems), filteredItems);
};
