import { getStreetMapUrl } from 'utils/mapbox';

export const itemWidth = 232;
const itemHeight = 100;

export const mapStyle = (lat, lon, width, height) => {
  width = width || itemWidth - 2; // minus 2 borders
  height = height || itemHeight;
  return { background: `url("${getStreetMapUrl(lat, lon, width, height)}") no-repeat center/cover` };
};
