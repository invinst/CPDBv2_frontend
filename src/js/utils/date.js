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

export const formatDate = (str, uppercase=true) => {
  if (isEmpty(str)) {
    return null;
  }

  const date = moment(str);
  if (date.isValid()) {
    const formattedDate = date.format('ll');
    return uppercase ? formattedDate.toUpperCase() : formattedDate;
  }
  return null;
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
