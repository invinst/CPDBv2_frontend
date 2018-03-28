import moment from 'moment';
import { isEmpty, rangeRight, slice } from 'lodash';

import { NEW_TIMELINE_ITEMS } from 'utils/constants';


export const baseTransform = (item) => ({
  year: moment(item.date).year(),
  date: moment(item.date).format('MMM D').toUpperCase(),
  kind: item.kind,
  rank: item.rank,
  rankDisplay: item.rank,
  unitName: item['unit_name'],
  unitDescription: item['unit_description'],
  unitDisplay: item['unit_description'],
  isFirstRank: false,
  isLastRank: false,
  isFirstUnit: false,
  isLastUnit: false,
});

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

export const crTransform = (item) => ({
  ...baseTransform(item),
  category: item.category,
  crid: item.crid,
  coaccused: item.coaccused,
  finding: item.finding,
  outcome: item.outcome,
  attachments: attachmentsTransform(item.attachments),
});

export const trrTransform = (item) => ({
  ...baseTransform(item),
  category: item['firearm_used'] ? 'Firearm' : item.taser ? 'Taser' : 'Use of Force Report',
});

export const awardTransform = (item) => ({
  ...baseTransform(item),
  category: item['award_type'],
});

const transformMap = {
  [NEW_TIMELINE_ITEMS.CR]: crTransform,
  [NEW_TIMELINE_ITEMS.FORCE]: trrTransform,
  [NEW_TIMELINE_ITEMS.JOINED]: baseTransform,
  [NEW_TIMELINE_ITEMS.UNIT_CHANGE]: baseTransform,
  [NEW_TIMELINE_ITEMS.AWARD]: awardTransform,
};

const transform = (item) => transformMap[item.kind](item);

export const yearItem = (baseItem, year, hasData) => ({
  rank: baseItem.rank,
  rankDisplay: baseItem.rankDisplay,
  unitName: baseItem.unitName,
  unitDescription: baseItem.unitDescription,
  unitDisplay: baseItem.unitDisplay,
  kind: NEW_TIMELINE_ITEMS.YEAR,
  date: `${year}`,
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

export const getNewTimelineItems = state => {
  const items = state.officerPage.newTimeline.items;

  if (isEmpty(items)) {
    return [];
  }
  const transformedItems = items.map(transform);
  const processors = [fillYears, dedupeRank, dedupeUnit, markFirstAndLastUnit, fillUnitChange];

  return processors.reduce((accItems, processor) => processor(accItems), transformedItems);
};
