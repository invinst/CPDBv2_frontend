import moment from 'moment';


export const getThisYear = () => {
  if (global.LIVE_TEST !== undefined || global.mocha !== undefined) {
    return 2017;
  }
  /* istanbul ignore next */
  return (new Date()).getFullYear();
};

export const formatDate = (str) => {
  let date = moment(str);
  return date.isValid() ? date.format('ll').toUpperCase() : null;
};

export const getCurrentAge = (birthYear) => (getThisYear() - birthYear);
