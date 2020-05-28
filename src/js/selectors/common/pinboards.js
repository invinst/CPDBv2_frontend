import { filter, find, get, isUndefined } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { DATE_FORMAT } from 'utils/constants';
import {
  isItemPinned,
  pinboardPinnedItemsMapping,
  pinboardPinnedItemsTransform,
} from 'selectors/pinboard-page/pinboard';


const pinboardsSelector = state => get(state, 'pinboardPage.pinboards', []);

export const rawPinboardsSelector = createSelector(
  pinboardsSelector,
  state => state.pinboardPage.pinboard,
  (pinboards, currentPinboard) => {
    const currentPinboardInList = find(pinboards, (pinboard) => pinboard.id === currentPinboard.id);
    if (isUndefined(currentPinboardInList)) {
      return pinboards;
    }
    const filteredPinboards = filter(pinboards, (pinboard) => pinboard.id !== currentPinboard.id);
    return [
      { ...currentPinboardInList, ...currentPinboard, 'is_current': true },
      ...filteredPinboards,
    ];
  }
);

const pinboardItemTransform = (pinboard, id, itemType) => ({
  id: pinboard['id'].toString(),
  title: get(pinboard, 'title', ''),
  createdAt: moment(pinboard['created_at']).format(DATE_FORMAT),
  isPinned: isItemPinned(itemType, id, pinboardPinnedItemsMapping(pinboardPinnedItemsTransform(pinboard))),
  isCurrent: get(pinboard, 'is_current', false),
});

export const pinboardsMenuSelector = (idSelector, itemType) => createSelector(
  rawPinboardsSelector,
  idSelector,
  (pinboards, id) => pinboards.map(pinboard => pinboardItemTransform(pinboard, id, itemType)),
);

export const showSelectPinboardsSelector = createSelector(
  pinboardsSelector,
  pinboards => pinboards.length > 1,
);
