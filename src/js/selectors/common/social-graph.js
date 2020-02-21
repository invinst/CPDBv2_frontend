import { visualTokenBackground } from './percentile';
import { get } from 'lodash';


const officerTransform = officer => ({
  id: officer['id'],
  fullName: officer['full_name'],
  visualTokenBackground: visualTokenBackground(officer['percentile']),
});

const coaccusedDataTransform = coaccusedDatum => ({
  officerId1: coaccusedDatum['officer_id_1'],
  officerId2: coaccusedDatum['officer_id_2'],
  incidentDate: coaccusedDatum['incident_date'],
  accussedCount: coaccusedDatum['accussed_count'],
});

export const graphDataFormatter = data => ({
  officers: get(data, 'officers', []).map(officerTransform),
  coaccusedData: get(data, 'coaccused_data', []).map(coaccusedDataTransform),
  listEvent: get(data, 'list_event', []),
});
