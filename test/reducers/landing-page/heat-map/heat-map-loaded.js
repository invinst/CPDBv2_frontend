import { LOCATION_CHANGE } from 'connected-react-router';

import heatMapLoaded from 'reducers/landing-page/heat-map/head-map-loaded';
import { HEAT_MAP_LOADED } from 'utils/constants';


describe('heatMapLoaded reducer', function () {
  it('should have initial state', function () {
    heatMapLoaded(undefined, {}).should.be.false();
  });

  it('should handle HEAT_MAP_LOADED', function () {
    heatMapLoaded(false, { type: HEAT_MAP_LOADED }).should.be.true();
  });

  it('should handle LOCATION_CHANGE', function () {
    heatMapLoaded(true, { type: LOCATION_CHANGE }).should.be.false();
  });
});
