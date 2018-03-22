import moment from 'moment';
import { isEmpty, rangeRight } from 'lodash';


const baseTransform = (item) => ({
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

const attachmentsTransform = (attachments) => {
  if (attachments) {
    return attachments.map((attachment) => ({
      title: attachment.title,
      url: attachment.url,
      previewImageUrl: attachment['preview_image_url'],
    }));
  }
  return [];
};

const crTransform = (item) => ({
  ...baseTransform(item),
  category: item.category,
  crid: item.crid,
  coaccused: item.coaccused,
  finding: item.finding,
  outcome: item.outcome,
  attachments: attachmentsTransform(item.attachments),
});

const trrTransform = (item) => ({
  ...baseTransform(item),
  category: item['firearm_used'] ? 'Firearm' : item.taser ? 'Taser' : 'Use of Force Report',
});

const awardTransform = (item) => ({
  ...baseTransform(item),
  category: item['award_type'],
});

const transformMap = {
  'CR': crTransform,
  'FORCE': trrTransform,
  'JOINED': baseTransform,
  'UNIT_CHANGE': baseTransform,
  'AWARD': awardTransform,
};

const transform = (item) => transformMap[item.kind](item);

const yearItem = (baseItem, year, hasData) => ({
  rank: baseItem.rank,
  rankDisplay: baseItem.rankDisplay,
  unitName: baseItem.unitName,
  unitDescription: baseItem.unitDescription,
  unitDisplay: baseItem.unitDisplay,
  kind: 'YEAR',
  date: year,
  hasData,
});

const gapYearItems = (fromItem, toItem) => {
  const years = rangeRight(toItem.year, fromItem.year);

  const yearItems = years.map((year) => yearItem(toItem, year, false));
  if (!isEmpty(yearItems)) {
    yearItems[yearItems.length - 1].hasData = true;
  }
  return yearItems;
};

const fillGapYears = (items) => {
  if (isEmpty(items)) {
    return [];
  }
  else {
    let newItems = [];
    newItems.push(yearItem(items[0], items[0].year, true));

    items.map((currentItem, index) => {
      newItems.push(currentItem);

      if (index < items.length - 1) {
        const nextItem = items[index + 1];
        newItems = newItems.concat(gapYearItems(currentItem, nextItem));
      }
    });

    return newItems;
  }
};

const dedupeRank = (items) => {
  if (!isEmpty(items)) {
    items[0].isFirstRank = true;
    items[items.length - 1].isLastRank = true;
    items.map((item, index) => {
      if (index !== 0) {
        item.rankDisplay = ' ';
      }
      return item;
    });
  }
  return items;
};

const dedupeUnit = (items) => {
  const dedupedItems = items.map((currentItem, index) => {
    if (index > 0) {
      const previousItem = items[index - 1];
      if (currentItem.unitDescription === previousItem.unitDescription) {
        currentItem.unitDisplay = ' ';
      }
    }
    return currentItem;
  });
  dedupedItems[dedupedItems.length - 1].unitDisplay = dedupedItems[dedupedItems.length - 1].unitDescription;

  dedupedItems[0].isFirstUnit = true;
  dedupedItems[dedupedItems.length - 1].isLastUnit = true;
  dedupedItems.map((item, index) => {
    if (item.kind === 'UNIT_CHANGE') {
      if (index - 1 >= 0) {
        dedupedItems[index - 1].isLastUnit = true;
      }
      dedupedItems[index + 1].isFirstUnit = true;
    }
  });
  return dedupedItems;
};

export const getNewTimelineItems = state => {
  const items = state.officerPage.newTimeline.items;
  if (isEmpty(items)) {
    return [];
  }
  const transformedItems = items.map(transform);
  const processors = [fillGapYears, dedupeRank, dedupeUnit];

  return processors.reduce((accItems, processor) => processor(accItems), transformedItems);
};
