import { createSelector } from 'reselect';
import { filter, isUndefined, map, startCase, toLower, get, find, reverse, range, slice } from 'lodash';

import { pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';
import { officerPath, lawsuitPath } from 'utils/paths';
import { formatDate, getCurrentAgeString } from 'utils/date';
import { navigationItemTransform } from 'selectors/common/search-item-transforms';
import { FULL_MONTH_DATE_FORMAT, PIN_BUTTON_INTRODUCTION_INDEX, PINNED_ITEM_TYPES } from 'utils/constants';
import { isItemPinned } from 'selectors/pinboard-page/pinboard';
import { isPinButtonIntroductionVisitedSelector } from 'selectors/pinboard-introduction';


const defaultRecentSuggestionItemTransform = item => ({
  ...navigationItemTransform(item),
  subText: startCase(toLower(item.type)),
});

const officerTransform = (item, pinboardItems) => ({
  ...navigationItemTransform(item),
  fullName: item['name'] || item['full_name'],
  rank: item['rank'],
  complaintCount: item['allegation_count'],
  sustainedCount: item['sustained_count'],
  race: item.race || '',
  gender: item.gender || '',
  age: getCurrentAgeString(item['birth_year']),
  to: officerPath(item.id, item.name),
  isPinned: isItemPinned('OFFICER', item.id, pinboardItems),
});

const crTransform = (item, pinboardItems) => ({
  ...navigationItemTransform(item),
  crid: item.crid,
  to: `/complaint/${item.crid}/`,
  isPinned: isItemPinned('CR', item.crid, pinboardItems),
  category: item['category'],
  incidentDate: formatDate(item['incident_date']),
});

const trrTransform = (item, pinboardItems) => {
  const dateText = item['trr_datetime'] ? ` - ${formatDate(item['trr_datetime'], false, FULL_MONTH_DATE_FORMAT)}` : '';
  return {
    ...navigationItemTransform(item),
    to: `/trr/${item.id}/`,
    subText: `TRR # ${item.id}${dateText}`,
    isPinned: isItemPinned('TRR', item.id, pinboardItems),
    forceType: item['force_type'],
    incidentDate: formatDate(item['trr_datetime']),
  };
};

const lawsuitTransform = (item) => {
  return {
    ...navigationItemTransform(item),
    to: lawsuitPath(item['case_no']),
  };
};

const recentItemFormatterMapping = {
  'OFFICER': officerTransform,
  'CR': crTransform,
  'TRR': trrTransform,
  'LAWSUIT': lawsuitTransform,
};

const getRecentSuggestions = (state) => get(state, 'searchPage.recentSuggestions', []);
export const getRecentSuggestionsRequested = (state) => state.searchPage.recentSuggestionsRequested;

const getPinButtonIntroductionIndex = (recentItems) => {
  const itemsIndices = range(recentItems.length);
  const findIndices = [
    ...reverse(slice(itemsIndices, 0, PIN_BUTTON_INTRODUCTION_INDEX)),
    ...slice(itemsIndices, PIN_BUTTON_INTRODUCTION_INDEX),
  ];
  return find(findIndices, (recentItemIndex) => !isUndefined(PINNED_ITEM_TYPES[recentItems[recentItemIndex].type]));
};

export const recentSuggestionsSelector = createSelector(
  getRecentSuggestions,
  pinboardItemsSelector,
  isPinButtonIntroductionVisitedSelector,
  (recent, pinboardItems, isPinButtonIntroductionVisited) => {
    const recentData = [];
    const pinButtonIntroductionIndex = getPinButtonIntroductionIndex(recent);
    recent.forEach((recentItem, index) => {
      const itemFormatter = recentItemFormatterMapping[recentItem.type] || defaultRecentSuggestionItemTransform;
      if (!isUndefined(recentItem.data)) {
        const showIntroduction = !isUndefined(PINNED_ITEM_TYPES[recentItem.type]) && !isPinButtonIntroductionVisited;
        recentData.push({
          ...itemFormatter(recentItem.data, pinboardItems),
          showIntroduction: showIntroduction && (index === pinButtonIntroductionIndex),
        });
      }
    });
    return recentData;
  }
);

const RECENT_SUGGESTION_TYPES = {
  officerIds: 'OFFICER',
  crids: 'CR',
  trrIds: 'TRR',
};

export const recentSuggestionIdsSelector = createSelector(
  getRecentSuggestions,
  recentSuggestions => {
    const result = {};
    Object.keys(RECENT_SUGGESTION_TYPES).forEach((itemType) => {
      const ids = map(
        filter(recentSuggestions, (item) => item.type === RECENT_SUGGESTION_TYPES[itemType] && !isUndefined(item.id)),
        'id'
      );
      if (ids.length > 0) {
        result[itemType] = ids;
      }
    });
    return result;
  }
);
