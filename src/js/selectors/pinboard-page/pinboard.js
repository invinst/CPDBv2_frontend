import { get, isEmpty, map, includes } from 'lodash';
import { createSelector } from 'reselect';

import { generatePinboardUrl, isEmptyPinboard } from 'utils/pinboard';


const countPinnedItems = pinboard => {
  if (pinboard === null) {
    return 0;
  }
  return get(pinboard, 'officer_ids', []).length +
    get(pinboard, 'crids', []).length +
    get(pinboard, 'trr_ids', []).length;
};

export const getPinboard = createSelector(
  state => get(state, 'pinboardPage.pinboard', {}),
  pinboard => ({
    id: get(pinboard, 'id', null) !== null ? pinboard['id'].toString() : null,
    title: get(pinboard, 'title', ''),
    officerIds: map(get(pinboard, 'officer_ids', []), (id) => (id.toString())),
    crids: get(pinboard, 'crids', []),
    trrIds: map(get(pinboard, 'trr_ids', []), (id) => (id.toString())),
    description: get(pinboard, 'description', ''),
    url: generatePinboardUrl(pinboard),
    itemsCount: countPinnedItems(pinboard),
    isPinboardRestored: get(pinboard, 'isPinboardRestored', false),
    hasPendingChanges: get(pinboard, 'hasPendingChanges', false),
  })
);

export const hasPendingChangesSelector = createSelector(
  state => get(state, 'pinboardPage.pinboard', {}),
  pinboard => get(pinboard, 'hasPendingChanges', false),
);

export const isPinboardRestoredSelector = createSelector(
  state => state.pinboardPage.pinboard,
  pinboard => get(pinboard, 'isPinboardRestored', false),
);

export const pinboardItemsSelector = createSelector(
  getPinboard,
  ({ officerIds, crids, trrIds }) => ({
    'OFFICER': officerIds,
    'CR': crids,
    'TRR': trrIds,
  })
);

export const isItemPinned = (pinnedItemType, id, pinboardItems) => includes(pinboardItems[pinnedItemType], String(id));

export const pinboardICRIDsSelector = createSelector(
  getPinboard,
  ({ crids }) => crids
);

export const getInitialRequested = state => get(state, 'pinboardPage.initialRequested', false);
const getPinnedItemsRequested = state => get(state, 'pinboardPage.pinnedItemsRequested', false);
export const pinboardPageLoadingSelector = createSelector(
  getPinboard,
  getPinnedItemsRequested,
  (pinboard, pinnedItemsRequested) => {
    return (isEmpty(pinboard.id) && pinboard.hasPendingChanges)
      || (!isEmpty(pinboard.id) && pinboard.hasPendingChanges && !pinnedItemsRequested);
  }
);

export const isEmptyPinboardSelector = createSelector(
  getPinboard,
  isEmptyPinboard,
);

export const examplePinboardsSelector = createSelector(
  state => state.pinboardPage.pinboard,
  pinboard => get(pinboard, 'example_pinboards', []),
);
