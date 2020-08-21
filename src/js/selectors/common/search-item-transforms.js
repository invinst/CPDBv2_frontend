import { get } from 'lodash';

import { previewPaneTransformMap } from './preview-pane-transforms';
import { formatDate } from 'utils/date';
import { FULL_MONTH_DATE_FORMAT } from 'utils/constants';


const dateText = (dateString) => {
  const formattedDate = formatDate(dateString, false, FULL_MONTH_DATE_FORMAT);
  return dateString ? ` • ${formattedDate}` : '';
};
const getBaseTexts = (item) => ({ text: item.name, recentText: item.name });
const getCRTexts = (item) => {
  const text = `CR # ${item.crid}${dateText(item['incident_date'])}`;
  return {
    text,
    recentText: text,
  };
};
const getTRRTexts = (item) => ({ text: item['force_type'] || 'Unknown', recentText: item.id });
const getlawsuitTexts = (item) => {
  const text = `${item['primary_cause']}${dateText(item['incident_date'])}`;
  return {
    text,
    subText: item['summary'],
    recentText: text,
  };
};

const getUnitTexts = (item) => {
  const text = item.description || `Unit ${item.name}`;
  return { text, recentText: text };
};
const getSearchTermTexts = (item) => {
  const text = `${item.category_name} - ${item.name}`;
  return { text, recentText: text };
};

const textsMap = {
  'SEARCH-TERMS': getSearchTermTexts,
  'DATE > CR': getCRTexts,
  'DATE > TRR': getTRRTexts,
  CR: getCRTexts,
  TRR: getTRRTexts,
  LAWSUIT: getlawsuitTexts,
  UNIT: getUnitTexts,
  'INVESTIGATOR > CR': getCRTexts,
};

const uniqueKeyMap = {
  'DATE > CR': 'DATE-CR',
  'DATE > TRR': 'DATE-TRR',
  'UNIT > OFFICERS': 'UNIT-OFFICERS',
  'DATE > OFFICERS': 'DATE-OFFICERS',
  'INVESTIGATOR > CR': 'INVESTIGATOR-CR',
};

const baseItemTransform = (item) => ({
  type: item.type,
  id: item.id,
  to: item.to,
  url: item.url,
  itemRank: item.itemRank,
  uniqueKey: get(item, 'uniqueKey', `${uniqueKeyMap[item.type] || item.type}-${item.id}`),
  ...get(textsMap, item.type, getBaseTexts)(item),
});

export const navigationItemTransform = item => ({
  ...baseItemTransform(item),
  recentItemData: item,
});

export const searchResultItemTransform = (item) => ({
  ...baseItemTransform(item),
  tags: get(item, 'tags', []),
  itemIndex: item.itemIndex || 1,
  isPinned: item.isPinned,
  ...get(previewPaneTransformMap, item.type, () => {})(item),
});
