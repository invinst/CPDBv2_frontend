import TwitterWidgetsLoader from 'twitter-widgets';
import _mapboxgl from 'mapbox-gl';
import { stub } from 'sinon';

import { MAPBOX_ACCESS_TOKEN } from 'utils/constants';


export function loadTwitter(cb) {
  if (global.Mocha !== undefined) {
    const mockTwttr = {
      widgets: {
        createTimeline: () => {}
      }
    };
    cb(mockTwttr);
  } else {
    /* istanbul ignore next */
    TwitterWidgetsLoader.load(cb);
  }
}

_mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

if (global.mocha !== undefined) {
  stub(_mapboxgl, 'Map');
}

export const mapboxgl = _mapboxgl;
