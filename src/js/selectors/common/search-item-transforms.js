import { get } from 'lodash';

import { previewPaneTransformMap } from './preview-pane-transforms';
import { formatDate } from 'utils/date';
import { FULL_MONTH_DATE_FORMAT } from 'utils/constants';

const getBaseTexts = (item) => ({ text: item.name, recentText: item.name });
const getCRTexts = (item) => {
  const formattedDate = formatDate(item['incident_date'], false, FULL_MONTH_DATE_FORMAT);
  const dateText = item['incident_date'] ? ` • ${formattedDate}` : '';
  const text = `CR # ${item.crid}${dateText}`;
  return {
    text,
    recentText: text,
  };
};
const getTRRTexts = (item) => ({ text: item['force_type'] || 'Unknown', recentText: item.id });
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

export const baseItemTransform = (item) => ({
  type: item.type,
  id: item.id,
  to: get(item, 'to'),
  url: get(item, 'url'),
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
