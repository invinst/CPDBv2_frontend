import clusterGeoJsonRequested from 'reducers/landing-page/heat-map/cluster-geo-json-requested';
import { CLUSTER_GEO_REQUEST_START, CLUSTER_GEO_REQUEST_SUCCESS, CLUSTER_GEO_REQUEST_FAILURE } from 'utils/constants';


describe('clusterGeoJsonRequested reducer', function () {
  it('should have initial state', function () {
    clusterGeoJsonRequested(undefined, {}).should.be.false();
  });

  it('should handle CLUSTER_GEO_REQUEST_START', function () {
    clusterGeoJsonRequested(true, { type: CLUSTER_GEO_REQUEST_START }).should.be.false();
  });

  it('should handle CLUSTER_GEO_REQUEST_SUCCESS', function () {
    clusterGeoJsonRequested(false, { type: CLUSTER_GEO_REQUEST_SUCCESS }).should.be.true();
  });

  it('should handle CLUSTER_GEO_REQUEST_FAILURE', function () {
    clusterGeoJsonRequested(false, { type: CLUSTER_GEO_REQUEST_FAILURE }).should.be.true();
  });
});
