import { handleActions } from 'redux-actions';
import { random } from 'lodash';

import {
  REPORTS_REQUEST_SUCCESS
} from 'actions/reporting-page';
import groupTypes from 'components/reporting-page/group-types';
import uuid from 'utils/uuid';
import { reportTransform } from 'selectors/reporting-page';


export const STRATEGY_RANDOM = 'STRATEGY_RANDOM';

function groupUp(reports, strategy) {
  if (strategy === STRATEGY_RANDOM) {
    const groups = [];
    const remainingReports = [...reports];
    let groupType = null;
    while (remainingReports.length) {
      while (!groupType || groupType.reportsNo > remainingReports.length) {
        groupType = groupTypes[random(0, groupTypes.length - 1)];
      }
      const reports = [];
      for (let i = 0; i < groupType.reportsNo; i++) {
        reports.push(reportTransform(remainingReports.shift()));
      }
      groups.push({
        ...groupType,
        key: uuid(),
        reports
      });
      groupType = null;
    }
    return groups;
  }
  return [];
}

export default handleActions({
  [REPORTS_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    groups: [
      ...state.groups,
      ...groupUp(action.payload.results, state.groupingStrategy)
    ]
  })
}, { groups: [], groupingStrategy: STRATEGY_RANDOM });
