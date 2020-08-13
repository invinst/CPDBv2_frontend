import { MAPBOX_ACCESS_TOKEN } from 'utils/constants';

const MAPBOX_API_URL = 'https://api.mapbox.com/styles/v1/mapbox';
const MARKER_URL = 'https://cpdbv21777.blob.core.windows.net/assets/map-marker.png';

const getMapUrl = (lat, lon, width, height, mapStyle, zoom) => [
  MAPBOX_API_URL,
  mapStyle,
  'static',
  `url-${encodeURIComponent(MARKER_URL)}(${lon},${lat})`,
  `${lon},${lat},${zoom},0,0`,
  `${width}x${height}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`,
].join('/');

export const getComplaintMapUrl = (lat, lon, width, height) => {
  return getMapUrl(lat, lon, width, height, 'streets-v10', 12);
};

export const getLawsuitMapUrl = (lat, lon, width, height) => {
  return getMapUrl(lat, lon, width, height, 'streets-v10', 10);
};

export const getPrintMapUrl = (lat, lon, width, height) => {
  return getMapUrl(lat, lon, width, height, 'light-v9', 14);
};
