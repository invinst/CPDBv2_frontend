import {
  redirect,
  updatePinboardTimelineIdx,
  updatePinboardRefreshIntervalId,
  turnOnEmptyPinboardTitleEditMode,
  turnOffEmptyPinboardTitleEditMode,
  turnOnEmptyPinboardDescriptionEditMode,
  turnOffEmptyPinboardDescriptionEditMode,
} from 'actions/pinboard-page';
import {
  PINBOARD_PAGE_REDIRECT,
  UPDATE_PINBOARD_TIMELINE_IDX,
  UPDATE_PINBOARD_REFRESH_INTERVAL_ID,
  PINBOARD_EDIT_MODE,
  PINBOARD_EDIT_TYPES,
} from 'utils/constants';


describe('pinboard-page actions', function () {
  describe('redirect', function () {
    it('should return correct payload', function () {
      redirect(false).should.eql({
        type: PINBOARD_PAGE_REDIRECT,
        payload: false
      });
    });
  });

  describe('updatePinboardTimelineIdx', function () {
    it('should return correct payload', function () {
      updatePinboardTimelineIdx(20).should.eql({
        type: UPDATE_PINBOARD_TIMELINE_IDX,
        payload: 20
      });
    });
  });

  describe('updatePinboardRefreshIntervalId', function () {
    it('should return correct payload', function () {
      updatePinboardRefreshIntervalId(1234).should.eql({
        type: UPDATE_PINBOARD_REFRESH_INTERVAL_ID,
        payload: 1234
      });
    });
  });

  describe('turnOnEmptyPinboardTitleEditMode action', function () {
    it('should return correct action', function () {
      turnOnEmptyPinboardTitleEditMode().should.eql({
        type: PINBOARD_EDIT_MODE,
        payload: { editType: PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_TITLE, mode: true }
      });
    });
  });

  describe('turnOffEmptyPinboardTitleEditMode action', function () {
    it('should return correct action', function () {
      turnOffEmptyPinboardTitleEditMode().should.eql({
        type: PINBOARD_EDIT_MODE,
        payload: { editType: PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_TITLE, mode: false }
      });
    });
  });

  describe('turnOnEmptyPinboardDescriptionEditMode action', function () {
    it('should return correct action', function () {
      turnOnEmptyPinboardDescriptionEditMode().should.eql({
        type: PINBOARD_EDIT_MODE,
        payload: { editType: PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_DESCRIPTION, mode: true }
      });
    });
  });

  describe('turnOffEmptyPinboardDescriptionEditMode action', function () {
    it('should return correct action', function () {
      turnOffEmptyPinboardDescriptionEditMode().should.eql({
        type: PINBOARD_EDIT_MODE,
        payload: { editType: PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_DESCRIPTION, mode: false }
      });
    });
  });
});
