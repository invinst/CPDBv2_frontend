import { get, isEmpty, isUndefined, sum } from 'lodash';
import moment from 'moment/moment';
import { createSelector } from 'reselect';

import { attachmentsTransform } from 'selectors/officer-page/new-timeline';


const getItems = state => get(state.officerPage.newTimeline, 'items', []);

export const numAttachmentsSelector = createSelector(
  getItems,
  items => sum(items.map(item => (item.attachments || []).length))
);

export const attachmentsComplaintTransform = item => ({
  date: moment(item.date).format('MMM D, YYYY').toUpperCase(),
  category: item.category,
  crid: item.crid,
  coaccused: item.coaccused,
  finding: item.finding,
  outcome: item.outcome,
  attachments: attachmentsTransform(item.attachments),
});

const attachedComplaint = item => (item.kind == 'CR') && !isEmpty(get(item, 'attachments'));

export const complaintsWithAttachmentsSelector = createSelector(
  getItems,
  items => items.filter(attachedComplaint).map(attachmentsComplaintTransform)
);

export const hasComplaintSelector = createSelector(
  getItems,
  items => !isUndefined(items.find(attachedComplaint))
);

const attachmentsLawsuitTransform = item => ({
  caseNo: item.case_no,
  date: moment(item.date).format('MMM D, YYYY').toUpperCase(),
  misconduct: item.misconduct,
  outcome: item.outcome,
  attachments: attachmentsTransform(item.attachments),
});

const attachedLawsuit = item => (item.kind == 'LAWSUIT') && !isEmpty(get(item, 'attachments'));

export const lawsuitsWithAttachmentsSelector = createSelector(
  getItems,
  items => items.filter(attachedLawsuit).map(attachmentsLawsuitTransform)
);
