import { get } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { generatePinboardUrl } from 'utils/pinboard';
import { rawPinboardsSelector } from 'selectors/common/pinboards';
import { DATE_FORMAT } from 'utils/constants';


const pinboardItemTransform = pinboard => ({
  id: pinboard['id'].toString(),
  title: get(pinboard, 'title', ''),
  createdAt: moment(pinboard['created_at']).format(DATE_FORMAT),
  url: generatePinboardUrl(pinboard),
  isCurrent: get(pinboard, 'is_current', false),
});


export const pinboardsSelector = createSelector(
  rawPinboardsSelector,
  pinboards => pinboards.map(pinboardItemTransform)
);

export const getShowPinboardsList = state => state.pinboardPage.isShownPinboardsList;
