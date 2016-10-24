import { createSelector } from 'reselect';
import moment from 'moment';
import { map } from 'lodash';

import extractQuery from 'utils/extract-query';
import { getContentStateFromFields } from 'utils/draft';


const getNextUrl = state => state.reportingPage.pagination.next;

export const nextParamsSelector = createSelector(
  getNextUrl,
  nextUrl => extractQuery(nextUrl)
);


const plainTextValueToString = plainTextValue => (
  plainTextValue.blocks[0].text
);

export const reportTransform = report => {
  return {
    id: report.id,
    title: plainTextValueToString(
      getContentStateFromFields(report.fields, 'title').value
    ),
    publicationName: getContentStateFromFields(report.fields, 'publication').value,
    publishDate: moment(
      getContentStateFromFields(report.fields, 'publish_date').value
    ).format('ll')
  };
};


const getReports = state => state.reports;

export const reportsSelector = createSelector(
  getReports,
  (reports) => {
    return reports.map(reportTransform).slice(0, 15);
  }
);

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
