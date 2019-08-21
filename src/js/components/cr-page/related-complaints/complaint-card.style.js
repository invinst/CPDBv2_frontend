import { getComplaintMapUrl } from 'utils/mapbox';

export const itemWidth = 232;

export const mapStyle = (lat, lon) => ({
  background: `url("${getComplaintMapUrl(lat, lon, itemWidth, 100)}") no-repeat center/cover`,
});
