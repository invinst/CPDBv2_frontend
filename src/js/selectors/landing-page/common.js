import { toLower } from 'lodash';


export const cardTransform = card => ({
  id: card['id'],
  fullName: card['full_name'],
  visualTokenBackgroundColor: card['visual_token_background_color'],
  complaintCount: card['complaint_count'],
  sustainedCount: card['sustained_count'],
  complaintPercentile: card['complaint_percentile'],
  birthYear: card['birth_year'],
  race: toLower(card['race']),
  gender: toLower(card['gender']),
});
