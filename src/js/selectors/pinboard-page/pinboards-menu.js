import { get, includes } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { DATE_FORMAT } from 'utils/constants';
import { getOfficerId } from 'selectors/officer-page';

export const pinboardsMenuSelector = createSelector(
  state => state.pinboardPage.pinboardsMenu,
  getOfficerId,
  state => state.pinboardPage.pinboard,
  (pinboards, officerId, currentPinboard) => pinboards.map(pinboard => {
    const isCurrent = pinboard.id === currentPinboard.id;
    const officerIds = (isCurrent ? currentPinboard : pinboard)['officer_ids'];
    return {
      id: pinboard['id'].toString(),
      title: get(pinboard, 'title', ''),
      createdAt: moment(pinboard['created_at']).format(DATE_FORMAT),
      isPinned: includes(officerIds, officerId),
      isCurrent,
    };
  }),
);
