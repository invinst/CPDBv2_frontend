export const roundedPercentile = (percentile) => {
  const parsedPercentile = parseFloat(percentile);
  if (isNaN(parsedPercentile)) {
    return percentile;
  }
  return parsedPercentile >= 99.1 ? parseInt(parsedPercentile * 10) / 10 : Math.floor(parsedPercentile);
};
