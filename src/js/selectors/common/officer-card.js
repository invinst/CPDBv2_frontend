import { toLower, last, has } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';


export const officerCardTransform = card => ({
  id: card['id'],
  officerId: card['id'],
  fullName: card['full_name'],
  complaintCount: card['complaint_count'],
  sustainedCount: card['sustained_count'],
  complaintPercentile: parseFloat(card['complaint_percentile']),
  birthYear: card['birth_year'],
  race: card['race'] ? toLower(card['race']) : 'N/A',
  gender: card['gender'] ? toLower(card['gender']) : 'N/A',
  percentile: extractPercentile(has(card, 'percentile') ? card['percentile'] : last(card['percentiles'])),
  rank: card['rank'],
});
