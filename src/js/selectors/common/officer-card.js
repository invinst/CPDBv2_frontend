import { toLower, has } from 'lodash';

import { extractLatestPercentile } from 'selectors/common/percentile';
import { getCurrentAgeString } from 'utils/date';

export const officerCardTransform = card => {
  return {
    id: card['id'],
    officerId: card['id'],
    fullName: card['full_name'],
    complaintCount:
      has(card, 'complaint_count') ? card['complaint_count'] :
        has(card, 'allegation_count') ? card['allegation_count'] :
          0,
    sustainedCount: card['sustained_count'],
    allegationPercentile: parseFloat(card['percentile_allegation']),
    age: getCurrentAgeString(card['birth_year']),
    race: card['race'] ? toLower(card['race']) : 'N/A',
    gender: card['gender'] ? toLower(card['gender']) : 'N/A',
    percentile: extractLatestPercentile(card),
    rank: card['rank'],
  };
};
