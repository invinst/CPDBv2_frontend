import * as _ from 'lodash';
import { createSelector } from 'reselect';

import { officerCardTransform } from 'selectors/common/officer-card';


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
    crItems: _.get(pinboard, 'crItems', []),
    officerItems: _.get(pinboard, 'officerItems', []),
    trrItems: _.get(pinboard, 'trrItems', []),
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

const officerPinnedTransform = (officer) => {
  officer = {
    ...officerCardTransform(officer),
    type: 'OFFICER',
    isPinned: true,
  };
  officer['id'] = officer['id'].toString();
  return officer;
};

const crPinnedTransform = (cr) => ({
  id: cr['crid'],
  type: 'CR',
  isPinned: true,
  incidentDate: cr['incident_date'],
  category: cr['most_common_category'],
  point: cr['point'],
});

const trrPinnedTransform = (trr) => ({
  id: trr['id'].toString(),
  type: 'TRR',
  isPinned: true,
  category: trr['category'],
  trrDate: trr['trr_datetime'],
  point: trr['point'],
});

export const getPinboardItems = createSelector(
  getPinboard,
  ({ crItems, officerItems, trrItems }) => ({
    'CR': crItems.map(crPinnedTransform),
    'OFFICER': officerItems.map(officerPinnedTransform),
    'TRR': trrItems.map(trrPinnedTransform),
  })
);

export const pinboardICRIDsSelector = createSelector(
  getPinboard,
  ({ crids }) => crids
);
