import { createSelector } from 'reselect';

import { demographicDataTransform, hasDemographicData } from './common';


const getComplainantsSummary = state => state.pinboardPage.widgets.complainantsSummary;

export const getComplainantsSummaryRequesting = state => state.pinboardPage.widgets.complainantsSummaryRequesting;

export const hasComplainantsSummarySelector = createSelector(
  getComplainantsSummaryRequesting,
  getComplainantsSummary,
  hasDemographicData,
);

export const complainantsSummarySelector = createSelector(
  getComplainantsSummary,
  demographicDataTransform,
);
