import { isEmpty, isNull } from 'lodash';
import { createSelector } from 'reselect';

import { geographicDataRequestingSelector, hasMapMarkersSelector } from './geographic-data';
import { getSocialGraphRequesting, getCoaccusedData } from './social-graph';
import { PINBOARD_PAGE_TAB_NAMES } from 'utils/constants';


export const defaultTabSelector = createSelector(
  getSocialGraphRequesting,
  geographicDataRequestingSelector,
  getCoaccusedData,
  hasMapMarkersSelector,
  (socialGraphRequesting, geographicDataRequesting, coaccusedData, hasMapMarkers) => {
    if (!socialGraphRequesting && !geographicDataRequesting) {
      if (isEmpty(coaccusedData) && hasMapMarkers) {
        return PINBOARD_PAGE_TAB_NAMES.GEOGRAPHIC;
      } else {
        return PINBOARD_PAGE_TAB_NAMES.NETWORK;
      }
    } else {
      return null;
    }
  }
);

export const getCurrentTab = (state) => {
  const currentTab = state.pinboardPage.currentTab;
  if (isNull(currentTab)) {
    return defaultTabSelector(state);
  } else {
    if (currentTab === PINBOARD_PAGE_TAB_NAMES.GEOGRAPHIC && !hasMapMarkersSelector(state)) {
      return PINBOARD_PAGE_TAB_NAMES.NETWORK;
    }
    return currentTab;
  }
};
