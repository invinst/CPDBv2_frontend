/* istanbul ignore next */
import TwitterWidgetsLoader from 'twitter-widgets';
import _mapboxgl from 'mapbox-gl';
import { spy } from 'sinon';

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
  const addSourceSpy = spy();
  const addLayerSpy = spy();
  const setFilterSpy = spy();
  const addControlSpy = spy();
  const navigationControlSpy = spy();

  class MockMap {
    constructor() {
      this.addSource = addSourceSpy;
      this.addLayer = addLayerSpy;
      this.setFilter = setFilterSpy;
      this.addControl = addControlSpy;
    }
    on() {
      arguments[arguments.length - 1]({
        features: [{
          properties: {}
        }]
      }, this);
    }
  }

  _mapboxgl.Map = MockMap;
  _mapboxgl._addSourceSpy = addSourceSpy;
  _mapboxgl._addLayerSpy = addLayerSpy;
  _mapboxgl._setFilterSpy = setFilterSpy;
  _mapboxgl._addControlSpy = addControlSpy;
  _mapboxgl.NavigationControl = navigationControlSpy;
}

export const mapboxgl = _mapboxgl;
