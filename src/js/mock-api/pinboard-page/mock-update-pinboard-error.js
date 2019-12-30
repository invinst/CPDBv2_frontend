import { PINBOARDS_URL, SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL, SOCIAL_GRAPH_NETWORK_API_URL } from 'utils/constants';
import { getOrCreateEmptyPinboard, updatePinboard } from 'mock-api/pinboard';
import {
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from 'mock-api/pinboard-page/fetch-pinned-items';
import { getSocialGraphData } from 'mock-api/pinboard-page/social-graph';
import { pinboardGeographicTrrsData } from 'mock-api/pinboard-page/geographic-data';
import getRelevantCoaccusals, {
  filterPinnedOfficers,
  getFirstRelevantCoaccusals,
} from 'mock-api/pinboard-page/relevant-coaccusals';

export default (axiosMockClient, pinboardId, threshold, errorResponse) => {
  const pinboard = {
    'id': pinboardId,
    'title': 'Pinboard Title',
    'officer_ids': [1234],
    'crids': ['1234567'],
    'trr_ids': [1234],
    'description': 'Pinboard Description',
  };

  axiosMockClient.onGet(`${PINBOARDS_URL}${pinboardId}/`).reply(200, updatePinboard(pinboard));

  axiosMockClient.onGet(`${PINBOARDS_URL}${pinboardId}/complaints/`).reply(200, fetchPinboardComplaints());
  axiosMockClient.onGet(`${PINBOARDS_URL}${pinboardId}/officers/`).reply(200, fetchPinboardOfficers());
  axiosMockClient.onGet(`${PINBOARDS_URL}${pinboardId}/trrs/`).reply(200, fetchPinboardTRRs());
  axiosMockClient.onGet(SOCIAL_GRAPH_NETWORK_API_URL, { params: { 'pinboard_id': pinboardId } }).reply(
    200, getSocialGraphData()
  );
  axiosMockClient.onGet(SOCIAL_GRAPH_NETWORK_API_URL, { params: { 'pinboard_id': pinboardId } }).reply(
    200, getSocialGraphData()
  );
  axiosMockClient.onGet(SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL, { params: { 'pinboard_id': pinboardId } }).reply(
    200, pinboardGeographicTrrsData
  );

  axiosMockClient.onGet(`${PINBOARDS_URL}${pinboardId}/relevant-coaccusals/?`).reply(function () {
    const currentPinboard = getOrCreateEmptyPinboard(pinboardId);
    const relevantCoaccusals = getFirstRelevantCoaccusals(pinboardId, 50);
    return [200, filterPinnedOfficers(relevantCoaccusals, currentPinboard)];
  });
  axiosMockClient.onGet(`${PINBOARDS_URL}${pinboardId}/relevant-coaccusals/?limit=20&offset=20`).reply(
    200, getRelevantCoaccusals(pinboardId, 20, 20, 50)
  );
  axiosMockClient.onGet(`${PINBOARDS_URL}${pinboardId}/relevant-coaccusals/?limit=20&offset=40`).reply(
    200, getRelevantCoaccusals(pinboardId, 20, 40, 50)
  );

  axiosMockClient.onGet(`${PINBOARDS_URL}${pinboardId}/relevant-documents/?`).reply(200, []);
  axiosMockClient.onGet(`${PINBOARDS_URL}${pinboardId}/relevant-complaints/?`).reply(200, []);

  const replySuccess = config => {
    const pinboard = JSON.parse(config.data);
    pinboard.id = pinboardId;
    pinboard['officer_ids'] = (pinboard['officer_ids'] || []).map(id => parseInt(id));
    pinboard['trr_ids'] = (pinboard['trr_ids'] || []).map(id => parseInt(id));
    const newPinboard = updatePinboard(pinboard);
    return [200, newPinboard];
  };

  let counter = 0;
  axiosMockClient.onPut(`${PINBOARDS_URL}${pinboardId}/`).reply(function (config) {
    if (counter < threshold) {
      counter += 1;
      return errorResponse;
    } else {
      return replySuccess(config);
    }
  });
};
