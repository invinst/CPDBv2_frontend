import { get, isEmpty, isUndefined } from 'lodash';
import moment from 'moment/moment';
import { createSelector } from 'reselect';

import { attachmentsTransform } from 'selectors/officer-page/new-timeline';


export const attachmentsComplaintTransform = (item, index) => ({
  date: moment(item.date).format('MMM D, YYYY').toUpperCase(),
  category: item.category,
  crid: item.crid,
  coaccused: item.coaccused,
  finding: item.finding,
  outcome: item.outcome,
  attachments: attachmentsTransform(item.attachments),
});

const getItems = state => get(state.officerPage.newTimeline, 'items', []);

const attachedComplaint = item => !isEmpty(get(item, 'attachments'));

export const complaintsWithAttachmentsSelector = createSelector(
  getItems,
  items => items.filter(attachedComplaint).map(attachmentsComplaintTransform)
);

export const hasComplaintSelector = createSelector(
  getItems,
  items => !isUndefined(items.find(attachedComplaint))
);
