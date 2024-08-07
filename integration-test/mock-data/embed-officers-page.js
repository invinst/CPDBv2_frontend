import { RawOfficerCardFactory } from '../../src/js/utils/test/factories/activity-grid';

export const officersData = (ids) => {
  return ids.map(officerId => RawOfficerCardFactory.build({ id: parseInt(officerId) }));
};
