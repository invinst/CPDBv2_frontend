import isNumber from 'lodash/isNumber';

const roundPercentile = (percentile) => {
  if (!isNumber(percentile)) {
    return percentile;
  }
  return percentile >= 99.1 ? parseInt(percentile * 10) / 10 : Math.floor(percentile);
};

export default roundPercentile;
