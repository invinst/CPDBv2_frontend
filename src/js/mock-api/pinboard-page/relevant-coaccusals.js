import { get, filter, includes } from 'lodash';

import RawRelevantCoaccusalFactory from 'utils/test/factories/pinboard-page/raw-officer';
import { paginationResponse } from 'mock-api/pinboard-page/common';

const generateCoaccusals = paginationResponse('relevant-coaccusals', RawRelevantCoaccusalFactory);

export const getFirstRelevantCoaccusals = (pinboardId, count) => {
  const coaccusals = generateCoaccusals(pinboardId, 20, 0, count);
  const fixedCoaccusals = [
    RawRelevantCoaccusalFactory.build({
      'id': 123,
      rank: 'Detective',
      'full_name': 'Richard Sullivan',
      'coaccusal_count': 53,
    }),
    RawRelevantCoaccusalFactory.build({
      'id': 456,
      rank: 'Officer',
      'full_name': 'Baudilio Lopez',
      'coaccusal_count': 47,
    })
  ];
  coaccusals.results = fixedCoaccusals.concat(coaccusals.results).slice(0, 20);
  return coaccusals;
};

export const filterPinnedOfficers = (coaccusals, currentPinboard={}) => {
  const pinnedOfficerIds = get(currentPinboard, 'officer_ids', []);
  coaccusals.results = filter(coaccusals.results, coaccusal => !includes(pinnedOfficerIds, coaccusal.id));
  return coaccusals;
};

export default generateCoaccusals;
