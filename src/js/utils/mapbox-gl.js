import mapboxgl from 'mapbox-gl';
import { stub } from 'sinon';

import { MAPBOX_ACCESS_TOKEN } from 'utils/constants';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

if (global.mocha !== undefined) {
  stub(mapboxgl, 'Map');
}

export default mapboxgl;
