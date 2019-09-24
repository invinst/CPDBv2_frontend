import { get } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { generatePinboardUrl } from 'utils/pinboard';
import { DATE_FORMAT } from 'utils/constants';


export const getPinboards = createSelector(
  state => state.pinboardPage.pinboards,
  pinboards => pinboards.map(pinboard => ({
    id: pinboard['id'].toString(),
    title: get(pinboard, 'title', ''),
    createdAt: moment(pinboard['created_at']).format(DATE_FORMAT),
    url: generatePinboardUrl(pinboard),
  }))
);

export const getShowPinboardsList = state => state.pinboardPage.isShownPinboardsList;
