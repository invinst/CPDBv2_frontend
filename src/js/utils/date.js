export const getThisYear = () => {
  if (global.LIVE_TEST !== undefined || global.mocha !== undefined) {
    return 2017;
  }
  /* istanbul ignore next */
  return (new Date()).getFullYear();
};
