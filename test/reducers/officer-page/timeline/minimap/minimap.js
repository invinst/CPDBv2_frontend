import minimap from 'reducers/officer-page/timeline/minimap/minimap';

import { OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS } from 'utils/constants';


describe('minimap reducer', function () {
  it('should have initial state', function () {
    minimap(undefined, {}).should.eql([]);
  });

  it('should handle OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS', function () {
    minimap([], {
      type: OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS,
      payload: [123, 456]
    }).should.eql([123, 456]);
  });
});
