const roundPercentile = (percentile, toString=false) => {
  let parsedPercentile = parseFloat(percentile);
  if (isNaN(parsedPercentile)) {
    return percentile;
  }
  parsedPercentile = parsedPercentile >= 99.1 ?
    parseInt(parsedPercentile * 10) / 10 :
    Math.floor(parsedPercentile);
  return toString ? parsedPercentile.toString() : parsedPercentile;
};

export default roundPercentile;
