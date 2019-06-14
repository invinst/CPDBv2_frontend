import {
  redirect,
  updatePinboardTimelineIdx,
  updatePinboardRefreshIntervalId,
} from 'actions/pinboard-page';
import * as constants from 'utils/constants';


describe('pinboard-page actions', function () {
  describe('redirect', function () {
    it('should return correct payload', function () {
      redirect(false).should.eql({
        type: constants.PINBOARD_PAGE_REDIRECT,
        payload: false
      });
    });
  });

  describe('updatePinboardTimelineIdx', function () {
    it('should return correct payload', function () {
      updatePinboardTimelineIdx(20).should.eql({
        type: constants.UPDATE_PINBOARD_TIMELINE_IDX,
        payload: 20
      });
    });
  });

  describe('updatePinboardRefreshIntervalId', function () {
    it('should return correct payload', function () {
      updatePinboardRefreshIntervalId(1234).should.eql({
        type: constants.UPDATE_PINBOARD_REFRESH_INTERVAL_ID,
        payload: 1234
      });
    });
  });
});
