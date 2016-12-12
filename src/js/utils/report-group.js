import { random } from 'lodash';

import groupTypes from 'components/reporting-page/group-types';
import uuid from 'utils/uuid';

export const RANDOM_STRATEGY = 'RANDOM_STRATEGY';
export const CHECKER_BOARD_STRATEGY = 'CHECKER_BOARD_STRATEGY';

export const buildReportGroups = (reports, strategy = RANDOM_STRATEGY) => {
  const result = [];
  let cloneReports = reports.slice(0);

  const groupTypesGenerator = getGroupTypesGenerator(strategy);
  const groupTypes = groupTypesGenerator(cloneReports);

  while (cloneReports.length) {
    const outputReports = [];
    const groupType = groupTypes.next().value;

    for (let i = 0; i < groupType.reportsNo; i++) {
      outputReports.push(cloneReports.shift());
    }

    result.push({ ...groupType, key: uuid(), reports: outputReports });
  }

  return result;
};

const getGroupTypesGenerator = (strategy) => {
  switch (strategy) {
    case RANDOM_STRATEGY:
      return randomGroupTypesGenerator;
    case CHECKER_BOARD_STRATEGY:
      return checkerBoardGroupTypesGenerator;
  }
};

function* randomGroupTypesGenerator(reports) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let groupType = null;
    while (!groupType || groupType.reportsNo > reports.length) {
      groupType = groupTypes[random(0, groupTypes.length - 1)];
    }
    yield groupType;
  }
}

function* checkerBoardGroupTypesGenerator(reports) {
  let index = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield groupTypes[++index % 2];
  }
}
