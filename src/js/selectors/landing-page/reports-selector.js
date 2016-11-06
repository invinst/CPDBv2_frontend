import { createSelector } from 'reselect';
import { map } from 'lodash';

import { reportTransform } from 'selectors/reporting-page';
import { replaceReportRichTextFields } from 'utils/rich-text';


const getReportIds = state => state.landingPage.reportSection.reports;
const getReports = state => state.reports;
const getContentStates = state => state.contentStates;
const getIsRequesting = state => state.landingPage.reportSection.isRequesting;

export const reportsSelector = createSelector(
  getReportIds,
  getReports,
  getContentStates,
  (ids, reports, contentStates) => map(ids, id => {
    const report = reports[id];
    replaceReportRichTextFields(report, contentStates);
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
