import { get } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { generatePinboardUrl } from 'utils/pinboard';
import { rawPinboardsSelector } from 'selectors/common/pinboards';
import { SIMPLE_DATE_FORMAT, PINBOARD_VIEWED_DATE_TIME_FORMAT } from 'utils/constants';


const pinboardItemTransform = (pinboard, creatingNewPinboard) => ({
  id: pinboard['id'].toString(),
  key: pinboard['id'].toString(),
  title: get(pinboard, 'title', ''),
  createdAt: moment(pinboard['created_at']).format(SIMPLE_DATE_FORMAT),
  lastViewedAt: moment(pinboard['last_viewed_at']).format(PINBOARD_VIEWED_DATE_TIME_FORMAT),
  url: generatePinboardUrl(pinboard),
  isCurrent: !creatingNewPinboard && get(pinboard, 'is_current', false),
  hasPendingChanges: pinboard.hasPendingChanges,
  hasTitlePendingChange: pinboard.hasTitlePendingChange,
});

const getcreatingNewPinboard = state => state.pinboardPage.creatingNewPinboard;

export const pinboardsSelector = createSelector(
  rawPinboardsSelector,
  getcreatingNewPinboard,
  (pinboards, creatingNewPinboard) => {
    let addingPinboard = [];
    if (creatingNewPinboard) {
      addingPinboard = [{ key: 'new-pinboard', title: 'Adding pinboard...', hasPendingChanges: true, isCurrent: true }];
    }
    return [
      ...addingPinboard,
      ...pinboards.map(pinboard => pinboardItemTransform(pinboard, creatingNewPinboard)),
    ];
  }
);

export const getShowPinboardsList = state => state.pinboardPage.isShownPinboardsList;
