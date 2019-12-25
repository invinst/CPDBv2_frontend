import { toLower, last, has } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';
import { getCurrentAge } from 'utils/date';

export const officerCardTransform = card => {
  const age = getCurrentAge(card['birth_year']);
  const ageString = age ? `${age}-year-old` : '';

  return {
    id: card['id'],
    officerId: card['id'],
    fullName: card['full_name'],
    complaintCount:
      has(card, 'complaint_count') ? card['complaint_count'] :
        has(card, 'allegation_count') ? card['allegation_count'] :
          0,
    sustainedCount: card['sustained_count'],
    complaintPercentile: parseFloat(card['complaint_percentile']),
    age: ageString,
    race: card['race'] ? toLower(card['race']) : 'N/A',
    gender: card['gender'] ? toLower(card['gender']) : 'N/A',
    percentile: extractPercentile(card['percentile'] || last(card['percentiles'])),
    rank: card['rank'],
  };
};
