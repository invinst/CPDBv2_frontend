import { toLower } from 'lodash';

import { extractPercentile } from './percentile';


export const officerCardTransform = officer => ({
  id: officer['id'],
  officerId: officer['id'],
  fullName: officer['full_name'],
  complaintCount: officer['complaint_count'],
  sustainedCount: officer['sustained_count'],
  complaintPercentile: parseFloat(officer['complaint_percentile']),
  birthYear: officer['birth_year'],
  race: officer['race'] ? toLower(officer['race']) : 'N/A',
  gender: officer['gender'] ? toLower(officer['gender']) : 'N/A',
  percentile: extractPercentile(officer['percentile']),
  type: officer['type'],
});
