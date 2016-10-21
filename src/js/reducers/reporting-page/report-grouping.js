import { handleActions } from 'redux-actions';
import { random, filter } from 'lodash';

import {
  REPORTS_REQUEST_SUCCESS
} from 'actions/reporting-page';
import groupTypes from 'components/reporting-page/group-types';
import uuid from 'utils/uuid';
import { reportTransform } from 'selectors/reporting-page';


export const STRATEGY_RANDOM = 'STRATEGY_RANDOM';

function groupUp(reports, state) {
  const strategy = state.groupingStrategy;
  const existingReportIds = state.existingReportIds;
  const groups = [...state.groups];

  if (strategy === STRATEGY_RANDOM) {
    const newReports = filter(
      reports,
      report => existingReportIds.indexOf(report.id) === -1);
    let groupType = null;
    while (newReports.length) {
      while (!groupType || groupType.reportsNo > newReports.length) {
        groupType = groupTypes[random(0, groupTypes.length - 1)];
      }
      const reports = [];
      for (let i = 0; i < groupType.reportsNo; i++) {
        let report = newReports.shift();
        reports.push(reportTransform(report));
        existingReportIds.push(report.id);
      }
      groups.push({
        ...groupType,
        key: uuid(),
        reports
      });
      groupType = null;
    }
    return {
      groups,
      existingReportIds
    };
  }
  return state;
}

export default handleActions({
  [REPORTS_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...groupUp(action.payload.results, state)
  })
}, {
  groups: [],
  groupingStrategy: STRATEGY_RANDOM,
  existingReportIds: []
});
