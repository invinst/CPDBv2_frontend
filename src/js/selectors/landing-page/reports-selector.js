import { createSelector } from 'reselect';
import { map } from 'lodash';

import { reportTransform } from 'selectors/reporting-page';


const getReportIds = state => state.landingPage.reportSection.reports;
const getReports = state => state.reports;
const getIsRequesting = state => state.landingPage.reportSection.isRequesting;

export const reportsSelector = createSelector(
  getReportIds,
  getReports,
  (ids, reports) => map(ids, id => reportTransform(reports[id]))
);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  getReportIds,
  (isRequesting, reports) => {
    return !isRequesting && reports && reports.length > 0;
  }
);
