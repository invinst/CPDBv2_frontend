import should from 'should';

import communities from 'reducers/landing-page/heat-map/communities';
import * as constants from 'utils/constants';


describe('communities reducer', function () {
  it('should have initial state', function () {
    should(communities(undefined, {})).eql(null);
  });

  it('should handle COMMUNITY_REQUEST_START', function () {
    communities({
      type: 'FeatureCollection',
      features: []
    }, {
      type: constants.COMMUNITY_REQUEST_START,
      payload: {}
    }).should.eql({
      type: 'FeatureCollection',
      features: []
    });
  });

  it('should handle COMMUNITY_REQUEST_SUCCESS', function () {
    communities(undefined, {
      type: constants.COMMUNITY_REQUEST_SUCCESS,
      payload: {
        type: 'FeatureCollection',
        features: [1, 2, 3]
      }
    }).should.eql({
      type: 'FeatureCollection',
      features: [1, 2, 3]
    });
  });

  it('should handle COMMUNITY_REQUEST_FAILURE', function () {
    communities({
      type: 'FeatureCollection',
      features: []
    }, {
      type: constants.COMMUNITY_REQUEST_FAILURE,
      payload: {}
    }).should.eql({
      type: 'FeatureCollection',
      features: []
    });
  });
});
