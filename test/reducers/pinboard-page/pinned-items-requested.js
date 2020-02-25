import should from 'should';
import { LOCATION_CHANGE } from 'connected-react-router';

import pinnedItemsRequested from 'reducers/pinboard-page/pinned-items-requested';
import {
  PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_FETCH_REQUEST_START,
  PINBOARD_TRRS_FETCH_REQUEST_START,
} from 'utils/constants';


describe('pinnedItemsRequested', function () {
  it('should have initial state', function () {
    should(pinnedItemsRequested(undefined, {})).be.false();
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_START', function () {
    pinnedItemsRequested(
      false,
      { type: PINBOARD_COMPLAINTS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_OFFICERS_FETCH_REQUEST_START', function () {
    pinnedItemsRequested(
      false,
      { type: PINBOARD_OFFICERS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_TRRS_FETCH_REQUEST_START', function () {
    pinnedItemsRequested(
      false,
      { type: PINBOARD_TRRS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle LOCATION_CHANGE', function () {
    pinnedItemsRequested(
      true,
      { type: LOCATION_CHANGE }
    ).should.be.false();
  });
});
