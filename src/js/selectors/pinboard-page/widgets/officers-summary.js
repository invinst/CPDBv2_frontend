import { createSelector } from 'reselect';

import { demographicDataTransform, hasDemographicData } from './common';


const getOfficersSummary = state => state.pinboardPage.widgets.officersSummary;

export const getOfficersSummaryRequesting = state => state.pinboardPage.widgets.officersSummaryRequesting;

export const hasOfficersSummarySelector = createSelector(
  getOfficersSummaryRequesting,
  getOfficersSummary,
  hasDemographicData,
);

export const officersSummarySelector = createSelector(
  getOfficersSummary,
  demographicDataTransform,
);
