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
      'date_of_appt': '2000-01-02',
      'date_of_resignation': '2010-02-03',
      'badge': '456',
      'gender': 'Female',
      'to': '/officer/11/jerome-finnigan/',
      'birth_year': 1950,
      'race': 'Black',
      'unit': {
        'id': 4,
        'unit_name': '004',
        'description': 'District 004',
        'long_unit_name': 'Unit 004'
      },
      'percentile': {
        'year': 2010,
        'percentile_trr': '11.1100',
        'percentile_allegation': '22.2200',
        'percentile_allegation_civilian': '33.3300',
        'percentile_allegation_internal': '44.4400',
      },
      'allegation_count': 1,
      'civilian_compliment_count': 2,
      'sustained_count': 4,
      'discipline_count': 6,
      'trr_count': 7,
      'major_award_count': 8,
      'honorable_mention_count': 3,
      'honorable_mention_percentile': 88.88,
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
