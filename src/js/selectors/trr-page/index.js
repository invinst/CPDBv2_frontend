import { get } from 'lodash';
import { createSelector } from 'reselect';

import { getCurrentAge, getCareerDuration } from 'utils/date';
import { extractPercentile } from 'selectors/common/percentile';


export const getTRRId = state => String(state.trrPage.trrId);

const getData = state => state.trrPage.data;

export const officerSelector = createSelector(
  [getData],
  (data) => data.officer ? ({
    ...officerTransform(data.officer),
    assignedBeat: get(data, 'officer_assigned_beat'),
    onDuty: get(data, 'officer_duty_status'),
    inUniform: get(data, 'officer_in_uniform'),
  }) : {}
);

const officerTransform = (officer) => ({
  officerId: officer['id'],
  fullName: officer['full_name'],
  unitName: get(officer.unit, 'unit_name'),
  unitDescription: get(officer.unit, 'description'),
  birthYear: officer['birth_year'],
  yearOld: getCurrentAge(officer['birth_year']),
  race: officer.race,
  gender: officer.gender,
  careerDuration: getCareerDuration(officer['appointed_date'], officer['date_of_resignation']),
  percentile: extractPercentile(officer),
});
