import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid';

export const getOfficersData = (ids) => {
  const officerIds = ids.split(',');
  return officerIds.map(officerId => RawOfficerCardFactory.build({ id: parseInt(officerId) }));
};
