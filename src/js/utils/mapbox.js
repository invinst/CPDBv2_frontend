import 'mapbox.js';

import { MAPBOX_ACCESS_TOKEN } from 'utils/constants';


global.L.mapbox.accessToken = MAPBOX_ACCESS_TOKEN;

export const buildMap = (el, id, opts) => global.L.mapbox.map(el, id, opts);

export const buildMarker = geojson => global.L.mapbox.featureLayer().setGeoJSON(geojson);
