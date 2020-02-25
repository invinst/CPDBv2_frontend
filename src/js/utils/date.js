import moment from 'moment';
import { isEmpty } from 'lodash';

import config from 'config';

export const getThisYear = () => {
  if (config.appEnv === 'live-test' || global.mocha !== undefined) {
    return 2017;
  }
  /* istanbul ignore next */
  return (new Date()).getFullYear();
};

export const formatDate = (str, uppercase=false, format='ll') => {
  if (isEmpty(str)) {
    return '';
  }

  const date = moment(str);
  if (!date.isValid())
    return '';

  const formattedDate = date.format(format);
  return uppercase ? formattedDate.toUpperCase() : formattedDate;
};

const formatCareerDate = inputDate => moment(inputDate).format('ll').toUpperCase();

export const getCareerDuration = (dateOfAppt, dateOfResignation) => {
  if (!dateOfAppt && !dateOfResignation) {
    return '';
  }

  const careerStart = formatCareerDate(dateOfAppt);
  const careerEnd = dateOfResignation ? formatCareerDate(dateOfResignation) : 'Present';
  return `${careerStart} — ${careerEnd}`;
};

export const getCurrentAge = (birthYear) => (birthYear ? getThisYear() - birthYear : null);

export const getCurrentAgeString = birthYear => {
  const age = getCurrentAge(birthYear);
  return age ? `${age}-year-old` : '';
};
