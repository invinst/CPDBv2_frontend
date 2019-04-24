import { extractPercentile } from 'selectors/common/percentile';

export const officerTransform = officer => ({
  id: officer['id'],
  fullName: officer['full_name'],
});

export const officerDetailTransform = officer => ({
  id: officer['id'],
  fullName: officer['full_name'],
  percentile: extractPercentile(officer['percentile']),
});

export const coaccusedDataTransform = coaccusedDatum => ({
  officerId1: coaccusedDatum['officer_id_1'],
  officerId2: coaccusedDatum['officer_id_2'],
  incidentDate: coaccusedDatum['incident_date'],
  accussedCount: coaccusedDatum['accussed_count'],
});
