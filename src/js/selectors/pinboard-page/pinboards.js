import { get } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { generatePinboardUrl } from 'utils/pinboard';
import { rawPinboardsSelector } from 'selectors/common/pinboards';
import { SIMPLE_DATE_FORMAT, PINBOARD_VIEWED_DATE_TIME_FORMAT } from 'utils/constants';


const pinboardItemTransform = pinboard => ({
  id: pinboard['id'].toString(),
  title: get(pinboard, 'title', ''),
  createdAt: moment(pinboard['created_at']).format(SIMPLE_DATE_FORMAT),
  lastViewedAt: moment(pinboard['last_viewed_at']).format(PINBOARD_VIEWED_DATE_TIME_FORMAT),
  url: generatePinboardUrl(pinboard),
  isCurrent: get(pinboard, 'is_current', false),
});


export const pinboardsSelector = createSelector(
  rawPinboardsSelector,
  pinboards => pinboards.map(pinboardItemTransform)
);

export const getShowPinboardsList = state => state.pinboardPage.isShownPinboardsList;
