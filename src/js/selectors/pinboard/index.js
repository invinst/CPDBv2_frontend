import * as _ from 'lodash';
import { createSelector } from 'reselect';


export const getPinboard = createSelector(
  state => state.pinboard,
  (pinboard) => ({
    'id': _.get(pinboard, 'id', null),
    'title': _.get(pinboard, 'title', ''),
    'officerIds': _.map(_.get(pinboard, 'officer_ids', []), (id) => (id.toString())),
    'crids': _.get(pinboard, 'crids', []),
    'description': _.get(pinboard, 'description', ''),
  })
);

export const pinboardItemsSelector = createSelector(
  getPinboard,
  ({ officerIds, crids }) => ({
    'OFFICER': officerIds,
    'CR': crids,
  })
);

export const countPinnedItems = createSelector(
  getPinboard,
  ({ officerIds, crids }) => (officerIds.length + crids.length)
);
