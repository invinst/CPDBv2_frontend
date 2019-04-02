import { extractPercentile } from 'selectors/common/percentile';
import { formatDate } from 'utils/date';


const officerTransform = officer => ({
  id: officer.id,
  fullName: officer['full_name'],
  percentile: extractPercentile(officer.percentile),
});

const allegationTransform = allegation => ({
  crid: allegation.crid,
  category: allegation.category,
  incidentDate: formatDate(allegation['incident_date']),
  officers: (allegation.officers || []).map(officerTransform)
});

export const relevantDocumentTransform = document => ({
  previewImageUrl: document['preview_image_url'],
  url: document.url,
  allegation: allegationTransform(document.allegation)
});

export const relevantCoaccusalTransform = coaccusal => ({
  id: coaccusal.id,
  rank: coaccusal.rank,
  fullName: coaccusal['full_name'],
  coaccusalCount: coaccusal['coaccusal_count'],
  percentile: extractPercentile(coaccusal.percentile),
});

export const relevantComplaintTransform = allegation => ({
  ...allegationTransform(allegation),
  to: allegation['v2_to'],
  point: allegation.point,
});
