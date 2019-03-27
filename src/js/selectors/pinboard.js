import * as _ from 'lodash';
import { createSelector } from 'reselect';

const generatePinboardUrl = pinboard => {
  if (pinboard === null || pinboard['id'] === null) {
    return '';
  }

  const title = (pinboard['title'] !== '') ? pinboard['title'] : 'Untitled Pinboard';
  return `/pinboard/${pinboard.id}/${_.kebabCase(title)}/`;
};

const countPinnedItems = pinboard => {
  if (pinboard === null) {
    return 0;
  }
  return pinboard['officer_ids'].length + pinboard['crids'].length;
};

export const getPinboard = createSelector(
  state => state.pinboard,
  pinboard => ({
    id: _.get(pinboard, 'id', null) !== null ? pinboard['id'].toString() : null,
    title: _.get(pinboard, 'title', ''),
    officerIds: _.map(_.get(pinboard, 'officer_ids', []), (id) => (id.toString())),
    crids: _.get(pinboard, 'crids', []),
    description: _.get(pinboard, 'description', ''),
    url: generatePinboardUrl(pinboard),
    itemsCount: countPinnedItems(pinboard),
    ownedByCurrentUser: _.get(pinboard, 'ownedByCurrentUser', false),
  })
);

export const pinboardItemsSelector = createSelector(
  getPinboard,
  ({ officerIds, crids }) => ({
    'OFFICER': officerIds,
    'CR': crids,
  })
);
