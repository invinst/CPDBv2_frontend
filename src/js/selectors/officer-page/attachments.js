import { get, isEmpty } from 'lodash';
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

export const getComplaintsWithAttachments = createSelector(
  getItems,
  (items) => {
    const complaints = items.filter(item => !isEmpty(get(item, 'attachments')));
    return complaints.map(attachmentsComplaintTransform);
  }
);
