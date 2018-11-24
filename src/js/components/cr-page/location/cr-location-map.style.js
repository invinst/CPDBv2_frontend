import { getPrintMapUrl } from 'utils/mapbox';

export const mapStyle = (lat, lon) => ({
  background: `url("${getPrintMapUrl(lat, lon, 1000, 600)}") no-repeat center/cover`
});
