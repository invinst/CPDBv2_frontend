import { createSelector } from 'reselect';
import moment from 'moment';
import { map } from 'lodash';

import extractQuery from 'utils/extract-query';
import { getField, plainTextValueToString } from 'utils/draft';


const getNextUrl = state => state.reportingPage.pagination.next;
const getIsRequesting = state => state.reportingPage.isRequesting;

export const nextParamsSelector = createSelector(
  getNextUrl,
  nextUrl => extractQuery(nextUrl)
);

export const hasMoreSelector = createSelector(
  getNextUrl,
  getIsRequesting,
  (nextUrl, isRequesting) => {
    return !!nextUrl && !isRequesting;
  }
);

export const reportTransform = report => {
  return {
    id: report.id,
    title: plainTextValueToString(
      getField(report.fields, 'title').value
    ),
    publicationName: getField(report.fields, 'publication').value,
    publishDate: moment(
      getField(report.fields, 'publish_date').value
    ).format('ll')
  };
};


const getReports = state => state.reports;
const getGroups = state => state.reportingPage.reportGrouping.groups;

export const groupsSelector = createSelector(
  getReports,
  getGroups,
  (reports, groups) => (
    map(groups, group => ({
      ...group,
      reports: map(group.reports, id => reportTransform(reports[id]))
    }))
  )
);
