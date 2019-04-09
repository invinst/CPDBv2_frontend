import { first, last, includes } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';
import { formatDate } from 'utils/date';


const officerTransform = officer => {
  const names = officer['full_name'].match(/\w+/g);
  const shortName = `${first(names)[0]}. ${last(names)}`;

  return {
    id: officer.id,
    fullName: officer['full_name'],
    shortName,
    percentile: extractPercentile(officer.percentile),
  };
};

const allegationTransform = allegation => ({
  crid: allegation.crid,
  category: allegation.category,
  incidentDate: formatDate(allegation['incident_date'], false),
  officers: (allegation.officers || []).map(officerTransform)
});

export const relevantDocumentTransform = (document, crids) => ({
  previewImageUrl: document['preview_image_url'],
  url: document.url,
  allegation: allegationTransform(document.allegation),
  pinned: includes(crids, document.allegation.crid),
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
  point: allegation.point,
});
