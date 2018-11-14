import { createSelector } from 'reselect';

import { officerCardTransform } from 'selectors/common/officer-card';


const getOfficers = state => state.embed.officers;

export const embedOfficersSelector = createSelector(
  [getOfficers],
  officers => officers.map(officerCardTransform)
);
