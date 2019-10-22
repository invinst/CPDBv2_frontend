import { createSelector } from 'reselect';
import moment from 'moment';
import { filter, isUndefined, map, startCase, toLower, get } from 'lodash';

import { pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';
import { officerUrl } from 'utils/url-util';
import { getCurrentAge } from 'utils/date';
import { navigationItemTransform } from 'selectors/common/search-item-transforms';
import { FULL_MONTH_DATE_FORMAT } from 'utils/constants';
import { isItemPinned } from 'selectors/pinboard-page/pinboard';


const defaultRecentSuggestionItemTransform = item => ({
  ...navigationItemTransform(item),
  subText: startCase(toLower(item.type)),
});

const officerTransform = (item, pinboardItems) => ({
  ...navigationItemTransform(item),
  complaintCount: item['allegation_count'],
  sustainedCount: item['sustained_count'],
  race: item.race || '',
  gender: item.gender || '',
  age: getCurrentAge(item['birth_year']) || null,
  to: officerUrl(item.id, item.name),
  isPinned: isItemPinned('OFFICER', item.id, pinboardItems),
});

const crTransform = (item, pinboardItems) => ({
  ...navigationItemTransform(item),
  crid: item.crid,
  to: `/complaint/${item.crid}/`,
  isPinned: isItemPinned('CR', item.crid, pinboardItems),
});

const trrTransform = (item, pinboardItems) => {
  const dateText = item['trr_datetime'] ? ` - ${moment(item['trr_datetime']).format(FULL_MONTH_DATE_FORMAT)}` : '';
  return {
    ...navigationItemTransform(item),
    to: `/trr/${item.id}/`,
    subText: `TRR # ${item.id}${dateText}`,
    isPinned: isItemPinned('TRR', item.id, pinboardItems),
  };
};

const recentItemFormatterMapping = {
  'OFFICER': officerTransform,
  'CR': crTransform,
  'TRR': trrTransform,
};

const getRecentSuggestions = (state) => get(state, 'searchPage.recentSuggestions', []);
export const getRecentSuggestionsRequested = (state) => state.searchPage.recentSuggestionsRequested;

export const recentSuggestionsSelector = createSelector(
  getRecentSuggestions,
  pinboardItemsSelector,
  (recent, pinboardItems) => {
    const recentData = [];
    recent.forEach((recentItem) => {
      const itemFormatter = recentItemFormatterMapping[recentItem.type] || defaultRecentSuggestionItemTransform;
      if (!isUndefined(recentItem.data)) {
        recentData.push(itemFormatter(recentItem.data, pinboardItems));
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
