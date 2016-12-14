import { createSelector } from 'reselect';
import { map } from 'lodash';

import { reportTransform } from 'selectors/reporting-page';
import { buildReportGroups, CHECKER_BOARD_STRATEGY } from 'utils/report-group';


const getReportIds = state => state.landingPage.reportSection.reports;
const getReports = state => state.reports;
const getIsRequesting = state => state.landingPage.isRequesting;


export const reportGroupsSelector = createSelector(
  getReportIds,
  getReports,
  (ids, reports) => {
    const reportsOnLandingPage = map(ids, id => reportTransform(reports[id]));
    return buildReportGroups(reportsOnLandingPage, CHECKER_BOARD_STRATEGY);
  }
);

export const reportsSelector = createSelector(
  getReportIds,
  getReports,
  (ids, reports) => map(ids, id => {
    const report = reports[id];
    return reportTransform(report);
  })
);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  getReportIds,
  (isRequesting, reports) => {
    return !isRequesting && reports && reports.length > 0;
  }
);
