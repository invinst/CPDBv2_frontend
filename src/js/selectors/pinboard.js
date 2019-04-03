import * as _ from 'lodash';
import { createSelector } from 'reselect';
import { extractPercentile } from 'selectors/common/percentile';

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
  return pinboard['officer_ids'].length + pinboard['crids'].length + pinboard['trr_ids'].length;
};

const getRelevantCoaccusal = coaccusal => ({
  id: coaccusal.id,
  rank: coaccusal.rank,
  fullName: coaccusal['full_name'],
  coaccusalCount: coaccusal['coaccusal_count'],
  percentile: extractPercentile(coaccusal.percentile),
});

export const getPinboard = createSelector(
  state => state.pinboard,
  pinboard => ({
    id: _.get(pinboard, 'id', null) !== null ? pinboard['id'].toString() : null,
    title: _.get(pinboard, 'title', ''),
    officerIds: _.map(_.get(pinboard, 'officer_ids', []), (id) => (id.toString())),
    crids: _.get(pinboard, 'crids', []),
    trrIds: _.map(_.get(pinboard, 'trr_ids', []), (id) => (id.toString())),
    description: _.get(pinboard, 'description', ''),
    url: generatePinboardUrl(pinboard),
    itemsCount: countPinnedItems(pinboard),
    ownedByCurrentUser: _.get(pinboard, 'ownedByCurrentUser', false),
    relevantCoaccusals: _.map(_.get(pinboard, 'relevant_coaccusals', []), getRelevantCoaccusal),
  })
);

export const pinboardItemsSelector = createSelector(
  getPinboard,
  ({ officerIds, crids, trrIds }) => ({
    'OFFICER': officerIds,
    'CR': crids,
    'TRR': trrIds,
  })
);

export const pinboardICRIDsSelector = createSelector(
  getPinboard,
  ({ crids }) => crids
);
