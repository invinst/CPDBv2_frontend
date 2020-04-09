import should from 'should';

import clusterGeoJson from 'reducers/landing-page/heat-map/cluster-geo-json';
import { CLUSTER_GEO_REQUEST_START, CLUSTER_GEO_REQUEST_SUCCESS, CLUSTER_GEO_REQUEST_FAILURE } from 'utils/constants';


describe('clusterGeoJson reducer', function () {
  it('should have initial state', function () {
    should(clusterGeoJson(undefined, {})).eql(null);
  });

  it('should handle CLUSTER_GEO_REQUEST_START', function () {
    clusterGeoJson(
      'state',
      {
        type: CLUSTER_GEO_REQUEST_START,
      }
    ).should.eql('state');
  });

  it('should handle CLUSTER_GEO_REQUEST_SUCCESS', function () {
    clusterGeoJson(
      {},
      {
        type: CLUSTER_GEO_REQUEST_SUCCESS,
        payload: 'payload',
      }
    ).should.eql('payload');
  });

  it('should handle CLUSTER_GEO_REQUEST_FAILURE', function () {
    clusterGeoJson(
      'state',
      {
        type: CLUSTER_GEO_REQUEST_FAILURE,
      }
    ).should.eql('state');
  });
});
