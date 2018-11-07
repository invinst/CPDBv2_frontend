import moment from 'moment';

import config from 'config';

export const getThisYear = () => {
  if (config.appEnv === 'live-test' || global.mocha !== undefined) {
    return 2017;
  }
  /* istanbul ignore next */
  return (new Date()).getFullYear();
};

export const formatDate = (str) => {
  const date = moment(str);
  return date.isValid() ? date.format('ll').toUpperCase() : null;
};

const formatCareerDate = inputDate => moment(inputDate).format('ll').toUpperCase();

export const getCareerDuration = (dateOfAppt, dateOfResignation) => {
  if (!dateOfAppt && !dateOfResignation) {
    return '';
  }

  const careerStart = formatCareerDate(dateOfAppt);
  const careerEnd = dateOfResignation ? formatCareerDate(dateOfResignation) : 'Present';
  return `${careerStart}—${careerEnd}`;
};

export const getCurrentAge = (birthYear) => (birthYear ? getThisYear() - birthYear : null);
