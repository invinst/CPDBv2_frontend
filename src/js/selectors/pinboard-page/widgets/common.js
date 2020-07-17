import { isEmpty } from 'lodash';

const raceItemTransform = ({ race, percentage }) => ({
  name: race,
  percentage,
});

const genderItemTransform = ({ gender, percentage }) => ({
  name: gender || 'Unknown',
  percentage,
});

export const hasDemographicData = (requesting, demographicSummary) => (
  requesting ||
  !isEmpty(demographicSummary['race']) ||
  !isEmpty(demographicSummary['gender'])
);

export const demographicDataTransform = ({ gender, race }) => ({
  race: (race || []).map(raceItemTransform),
  gender: (gender || []).map(genderItemTransform),
});
