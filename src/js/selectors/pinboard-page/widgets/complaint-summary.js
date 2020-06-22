import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';


const complaintSummaryItemTransform = ({ category, count }) => ({
  title: category || 'Unknown',
  count,
});

const getComplaintSummary = state => state.pinboardPage.widgets.complaintSummary;

export const getComplaintSummaryRequesting = state => state.pinboardPage.widgets.complaintSummaryRequesting;

export const hasComplaintSummarySelector = createSelector(
  getComplaintSummaryRequesting,
  getComplaintSummary,
  (requesting, complaintSummary) => requesting || !isEmpty(complaintSummary),
);

export const complaintSummarySelector = createSelector(
  getComplaintSummary,
  (complaintSummary) => complaintSummary.map(complaintSummaryItemTransform)
);
