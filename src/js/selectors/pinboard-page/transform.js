import { first, last, includes } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';
import { formatDate } from 'utils/date';

const SHORT_NAME_MAX_LEN = 16;

const officerTransform = officer => {
  const fullName = officer['full_name'];
  const names = fullName.split(' ');
  const lastName = last(names);

  let shortName = fullName.replace(/(\w)\w+ /, '$1. ');
  if (shortName.length > SHORT_NAME_MAX_LEN) {
    shortName = `${first(names)[0]}. ${lastName}`;
    if (shortName.length > SHORT_NAME_MAX_LEN) {
      shortName = lastName;
    }
  }

  return {
    id: officer.id,
    fullName: officer['full_name'],
    shortName,
    percentile: extractPercentile(officer.percentile),
  };
};

export const relevantComplaintTransform = (allegation, updatingItem={}) => ({
  crid: allegation.crid,
  category: allegation.category,
  incidentDate: formatDate(allegation['incident_date'], false),
  officers: (allegation.coaccused || []).map(officerTransform),
  point: allegation.point,
  isPinStatusChanging: updatingItem.type === 'CR' && updatingItem.id === allegation.crid,
  recentItemData: allegation,
});

export const relevantDocumentTransform = (document, crids, updatingItem={}) => ({
  previewImageUrl: document['preview_image_url'],
  url: document.url,
  allegation: relevantComplaintTransform(document.allegation, updatingItem),
  pinned: includes(crids, document.allegation.crid),
});

export const relevantCoaccusalTransform = (coaccusal, updatingItem={}) => ({
  id: coaccusal.id,
  rank: coaccusal.rank,
  fullName: coaccusal['full_name'],
  coaccusalCount: coaccusal['coaccusal_count'],
  complaintCount: coaccusal['allegation_count'],
  percentile: extractPercentile(coaccusal.percentile),
  isPinStatusChanging: updatingItem.type === 'OFFICER' && updatingItem.id.toString() === coaccusal.id.toString(),
  recentItemData: coaccusal,
});
