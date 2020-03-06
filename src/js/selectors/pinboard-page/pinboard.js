import { get, isEmpty, map, includes, every } from 'lodash';
import { createSelector } from 'reselect';

import { generatePinboardUrl, isEmptyPinboard } from 'utils/pinboard';


const getRawPinboard = state => get(state, 'pinboardPage.pinboard', {});

const countPinnedItems = pinboard => {
  if (pinboard === null) {
    return 0;
  }
  return get(pinboard, 'officer_ids', []).length +
    get(pinboard, 'crids', []).length +
    get(pinboard, 'trr_ids', []).length;
};

export const getPinboard = createSelector(
  getRawPinboard,
  pinboard => ({
    id: get(pinboard, 'id', null) !== null ? pinboard['id'].toString() : null,
    title: get(pinboard, 'title', ''),
    description: get(pinboard, 'description', ''),
    officerIds: map(get(pinboard, 'officer_ids', []), (id) => (id.toString())),
    crids: get(pinboard, 'crids', []),
    trrIds: map(get(pinboard, 'trr_ids', []), (id) => (id.toString())),
    url: generatePinboardUrl(pinboard),
    itemsCount: countPinnedItems(pinboard),
    isPinboardRestored: get(pinboard, 'isPinboardRestored', false),
    hasPendingChanges: get(pinboard, 'hasPendingChanges', false),
  })
);

export const getPinboardId = state => get(state, 'pinboardPage.pinboard.id');

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

const hasRemovingItemsSelector = createSelector(
  state => get(state, 'pinboardPage.officerItems.removingItems', []),
  state => get(state, 'pinboardPage.crItems.removingItems', []),
  state => get(state, 'pinboardPage.trrItems.removingItems', []),
  (officerRemovingItems, crRemovingItems, trrRemovingItems) =>
    !every([officerRemovingItems, crRemovingItems, trrRemovingItems], isEmpty),
);

export const isEmptyPinboardSelector = createSelector(
  getPinboard,
  hasRemovingItemsSelector,
  (pinboard, hasRemovingItems) => isEmptyPinboard(pinboard) && !hasRemovingItems,
);

export const examplePinboardsSelector = createSelector(
  state => state.pinboardPage.pinboard,
  pinboard => get(pinboard, 'example_pinboards', []),
);
