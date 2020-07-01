import { kebabCase, isEmpty, isNil, includes, parseInt, identity, every, get, map } from 'lodash';

import browserHistory from 'utils/history';
import {
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchOtherPagesPinboardGeographicCrs,
  fetchOtherPagesPinboardGeographicTrrs,
  fetchPinboardGeographic,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  fetchPinboardRelevantDocuments,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
} from 'actions/pinboard';
import { DEFAULT_PINBOARD_PATH, PINBOARD_REQUEST_PATTERN } from 'utils/constants';
import { loadPaginatedData } from 'utils/load-paginated-data';
import config from 'config';
import { hidePinboardList } from 'actions/pinboard-page';
import { showIntercomLauncher } from './intercom';


export const generatePinboardUrl = (pinboard, isCurrent) => {
  if (pinboard === null || isNil(pinboard['id'])) {
    return isCurrent ? DEFAULT_PINBOARD_PATH : '';
  }

  const title = isEmpty(pinboard['title']) ? 'Untitled Pinboard' : pinboard['title'];
  return `/pinboard/${pinboard.id}/${kebabCase(title)}/`;
};

export const getPinboardIdFromRequestUrl = url => {
  if (url === undefined) {
    return url;
  }
  const matchUrl = url.match(PINBOARD_REQUEST_PATTERN);
  return matchUrl ? matchUrl[1] : null;
};

export const getFormatId = (attr) => {
  return includes(['officer_ids', 'trr_ids'], attr) ? parseInt : identity;
};

export const redirectToCreatedPinboard = (response) => {
  const pinboard = response.payload;
  const url = generatePinboardUrl(pinboard);

  if (!isEmpty(url)) {
    browserHistory.push(url);
  }
};

export const dispatchFetchPinboardPageData = (store, pinboardId) => {
  store.dispatch(fetchPinboardSocialGraph(pinboardId));
  store.dispatch(fetchPinboardGeographic());
  loadPaginatedData(
    { 'pinboard_id': pinboardId },
    fetchFirstPagePinboardGeographicCrs,
    fetchOtherPagesPinboardGeographicCrs,
    store,
  );
  loadPaginatedData(
    { 'pinboard_id': pinboardId },
    fetchFirstPagePinboardGeographicTrrs,
    fetchOtherPagesPinboardGeographicTrrs,
    store,
  );
  store.dispatch(fetchPinboardRelevantDocuments(pinboardId));
  store.dispatch(fetchPinboardRelevantCoaccusals(pinboardId));
  store.dispatch(fetchPinboardRelevantComplaints(pinboardId));
};

export const dispatchFetchPinboardPinnedItems = (store, pinboardId) => {
  store.dispatch(fetchPinboardComplaints(pinboardId));
  store.dispatch(fetchPinboardOfficers(pinboardId));
  store.dispatch(fetchPinboardTRRs(pinboardId));
};

export const isEmptyPinboard = pinboard => {
  const { officerIds, crids, trrIds } = pinboard;
  return every([officerIds, crids, trrIds], isEmpty);
};

export const getRequestPinboard = pinboard => ({
  id: get(pinboard, 'id', null),
  title: get(pinboard, 'title', ''),
  officerIds: map(get(pinboard, 'officer_ids', []), id => (id.toString())),
  crids: get(pinboard, 'crids', []),
  trrIds: map(get(pinboard, 'trr_ids', []), id => (id.toString())),
  description: get(pinboard, 'description', ''),
});

export const isPinboardFeatureEnabled = () => get(config, 'enableFeatures.pinboard', true);

export const handleClosePinboardsList = () => {
  showIntercomLauncher(true);
  return hidePinboardList();
};
