import { get } from 'lodash';
import moment from 'moment';

import { FULL_MONTH_DATE_FORMAT } from 'utils/constants';

const getBaseTexts = (item) => ({ text: item.name, recentText: item.name });
const getCRTexts = (item) => {
  const dateText = item['incident_date'] ? ` • ${moment(item['incident_date']).format(FULL_MONTH_DATE_FORMAT)}` : '';
  return {
    text: `CR # ${item.crid}${dateText}`,
    recentText: `CR # ${item.crid}${dateText}`,
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
