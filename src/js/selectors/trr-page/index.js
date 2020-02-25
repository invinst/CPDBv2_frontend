import { get } from 'lodash';
import { createSelector } from 'reselect';
import { compact, startCase, toLower } from 'lodash';

import { getCurrentAge, getCareerDuration, formatDate } from 'utils/date';
import { extractPercentile } from 'selectors/common/percentile';


export const getTRRId = state => String(state.trrPage.trrId);
export const getEditModeOn = state => state.trrPage.editModeOn;

const getData = state => state.trrPage.data;

export const officerSelector = createSelector(
  [getData],
  (data) => data.officer ? ({
    ...officerTransform(data.officer),
    assignedBeat: get(data, 'officer_assigned_beat'),
    onDuty: get(data, 'officer_on_duty'),
    inUniform: get(data, 'officer_in_uniform'),
  }) : {}
);

const officerTransform = (officer) => ({
  officerId: officer['id'],
  fullName: officer['full_name'],
  rank: officer['rank'],
  unitName: get(officer.unit, 'unit_name'),
  unitDescription: get(officer.unit, 'description'),
  birthYear: officer['birth_year'],
  yearOld: getCurrentAge(officer['birth_year']),
  race: officer.race,
  gender: officer.gender,
  careerDuration: getCareerDuration(officer['appointed_date'], officer['date_of_resignation']),
  percentile: extractPercentile(officer),
});

export const trrDetailSelector = createSelector(
  [getData],
  (data) => {
    const race = startCase(toLower(get(data, 'subject_race')));
    const sex = startCase(toLower(get(data, 'subject_gender')));
    const age = data['subject_age'] ? `${data['subject_age']} years old` : null;
    const demographic = compact([race, sex, age]).join(', ');
    return {
      subjectDemographic: demographic,
      category: get(data, 'force_category'),
      forceTypes: get(data, 'force_types'),
    };
  }
);

export const trrLocationSelector = createSelector(
  [getData],
  (data) => ({
    incidentDate: formatDate(get(data, 'date_of_incident'), true),
    address: get(data, 'address'),
    beat: String(get(data, 'beat')),
    locationType: get(data, 'location_type'),
    point: data.point,
  })
);

const getDocumentAlreadyRequested = state => {
  const trrId = getTRRId(state);
  return Boolean(get(
    state, `trrPage.attachmentRequest.subscribedTRRIds[${trrId}]`, undefined
  ));
};

export const trrDocumentSelector = createSelector(
  getDocumentAlreadyRequested,
  (alreadyRequested) => ({ alreadyRequested })
);
