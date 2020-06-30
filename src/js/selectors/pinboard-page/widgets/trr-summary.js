import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';


const trrSummaryItemTransform = (summaryItem) => ({
  title: summaryItem['force_type'] || 'Unknown',
  count: summaryItem['count'],
});

const getTRRSummary = state => state.pinboardPage.widgets.trrSummary;

export const getTRRSummaryRequesting = state => state.pinboardPage.widgets.trrSummaryRequesting;

export const hasTRRSummarySelector = createSelector(
  getTRRSummaryRequesting,
  getTRRSummary,
  (requesting, trrSummary) => requesting || !isEmpty(trrSummary),
);

export const trrSummarySelector = createSelector(
  getTRRSummary,
  (complaintSummary) => complaintSummary.map(trrSummaryItemTransform)
);
