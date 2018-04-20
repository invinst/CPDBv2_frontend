import 'mapbox.js';

import { MAPBOX_ACCESS_TOKEN } from 'utils/constants';

const MAPBOX_API_URL = 'https://api.mapbox.com/styles/v1/mapbox';

global.L.mapbox.accessToken = MAPBOX_ACCESS_TOKEN;

export const buildMap = (el, id, opts) => global.L.mapbox.map(el, id, opts);

export const buildMarker = geojson => global.L.mapbox.featureLayer().setGeoJSON(geojson);

export const getComplaintMapUrl = (lat, lon, width, height) => [
  MAPBOX_API_URL,
  'streets-v10',
  'static',
  `pin-s+ff0000(${lon},${lat})`,
  `${lon},${lat},12,0,0`,
  `${width}x${height}?access_token=${MAPBOX_ACCESS_TOKEN}`,
].join('/');
