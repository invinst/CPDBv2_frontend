import pluralize from 'pluralize';
import { createSelector } from 'reselect';
import { each, get } from 'lodash';
import moment from 'moment';

import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';
import extractQuery from 'utils/extract-query';
import { officerMostComplaintTransform } from 'selectors/common/preview-pane-transforms';
import { formatDate } from 'utils/date';
import { hasCachedData } from 'selectors/pinboard-page/social-graph';


export const getAllPinboards = state => state.pinboardAdminPage.allPinboards;

export const getIsLoading = state => state.pinboardAdminPage.isLoading;

export const nextParamsSelector = createSelector(
  getAllPinboards,
  pinboards => extractQuery(pinboards.pagination.next)
);

export const hasMoreSelector = createSelector(
  getAllPinboards,
  pinboards => pinboards.items.length < pinboards.count
);

const crTransform = (cr) => ({
  id: cr.crid,
  name: cr.category,
  subText: formatDate(cr['incident_date'], false),
  url: `/complaint/${cr.crid}/`,
});

const trrTransform = (trr) => ({
  id: trr.id,
  name: trr.category,
  subText: formatDate(trr['trr_datetime'], false),
  url: `/trr/${trr.id}/`,
});

const pinboardTransform = pinboard => ({
  id: pinboard.id,
  title: pinboard.title || 'Untitled Pinboard',
  createdAt: moment(pinboard['created_at']).format('MMM DD'),
  fullCreatedAt: moment(pinboard['created_at']).format('lll'),
  description: pinboard.description,
  pinnedCount: (
    `${ pluralize('officer', pinboard['officers_count'], true) }, ` +
    `${ pluralize('allegation', pinboard['allegations_count'], true) } and ` +
    `${ pluralize('TRR', pinboard['trrs_count'], true) }`
  ),
  officersCount: pinboard['officers_count'],
  allegationsCount: pinboard['allegations_count'],
  trrsCount: pinboard['trrs_count'],
  recentOfficers: get(pinboard, 'recent_officers', []).map(officerMostComplaintTransform),
  recentAllegations: get(pinboard, 'recent_allegations', []).map(crTransform),
  recentTrrs: get(pinboard, 'recent_trrs', []).map(trrTransform),
  kind: PINBOARDS_SEARCH_ITEMS.PINBOARD,
});

export const allPinboardsSelector = createSelector(
  getAllPinboards,
  ({ items: pinboards }) => {
    let results = [];
    let prevDate = null;
    each(pinboards, pinboard => {
      const date = moment(pinboard['created_at']);
      if (prevDate === null || date.month() !== prevDate.month() || date.year() !== prevDate.year()) {
        results.push({
          id: date.format('MM-YYYY'),
          text: date.format('MMM YYYY'),
          kind: PINBOARDS_SEARCH_ITEMS.MONTH_SEPARATOR,
        });
      }
      prevDate = date;
      results.push(pinboardTransform(pinboard));
    });
    return results;
  }
);
