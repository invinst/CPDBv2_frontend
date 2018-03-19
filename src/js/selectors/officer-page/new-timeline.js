import moment from 'moment';
import { isEmpty } from 'lodash';


const baseTransform = (item) => ({
  year: moment(item.date).year(),
  date: moment(item.date).format('MMM D').toUpperCase(),
  kind: item.kind,
  rank: item.rank,
  unitName: item['unit_name'],
  unitDescription: item['unit_description'],
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
  unitName: baseItem.unitName,
  unitDescription: baseItem.unitDescription,
  kind: 'YEAR',
  date: year,
  hasData,
});

const gapYears = (fromItem, toItem) => {
  const fromYear = fromItem.year;
  const toYear = toItem.year;

  if (fromYear > toYear) {
    let yearItems = [];
    for (let year = fromYear; year > toYear; year--) {
      yearItems.push(yearItem(toItem, year - 1, false));
    }
    yearItems.hasData = true;

    return yearItems;
  } else {
    return [];
  }
};

export const getNewTimelineItems = state => {
  const items = state.officerPage.newTimeline.items.map(transform);

  if (isEmpty(items)) {
    return [];
  }

  let newItems = [];
  newItems.push(yearItem(items[0], items[0].year, true));

  for (let i = 0; i < items.length - 1; i++) {
    const currentItem = items[i];
    const nextItem = items[i + 1];

    newItems.push(currentItem);
    newItems = newItems.concat(gapYears(currentItem, nextItem));
  }
  newItems.push(items[items.length - 1]);

  return newItems;
};
