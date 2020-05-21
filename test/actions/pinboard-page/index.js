import {
  updatePinboardTimelineIdx,
  updatePinboardRefreshIntervalId,
  turnOnEmptyPinboardTitleEditMode,
  turnOffEmptyPinboardTitleEditMode,
  turnOnEmptyPinboardDescriptionEditMode,
  turnOffEmptyPinboardDescriptionEditMode,
  fetchPinboards,
  showPinboardsList,
  hidePinboardList,
} from 'actions/pinboard-page';
import {
  UPDATE_PINBOARD_TIMELINE_IDX,
  UPDATE_PINBOARD_REFRESH_INTERVAL_ID,
  PINBOARD_EDIT_MODE,
  PINBOARD_EDIT_TYPES,
  PINBOARDS_FETCH_REQUEST_START,
  PINBOARDS_FETCH_REQUEST_SUCCESS,
  PINBOARDS_FETCH_REQUEST_FAILURE,
  PINBOARDS_URL,
  HIDE_SHOW_PINBOARDS_LIST,
} from 'utils/constants';


describe('pinboard-page actions', function () {
  describe('updatePinboardTimelineIdx', function () {
    it('should return correct payload', function () {
      updatePinboardTimelineIdx(20).should.eql({
        type: UPDATE_PINBOARD_TIMELINE_IDX,
        payload: 20,
      });
    });
  });

  describe('updatePinboardRefreshIntervalId', function () {
    it('should return correct payload', function () {
      updatePinboardRefreshIntervalId(1234).should.eql({
        type: UPDATE_PINBOARD_REFRESH_INTERVAL_ID,
        payload: 1234,
      });
    });
  });

  describe('turnOnEmptyPinboardTitleEditMode action', function () {
    it('should return correct action', function () {
      turnOnEmptyPinboardTitleEditMode().should.eql({
        type: PINBOARD_EDIT_MODE,
        payload: { editType: PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_TITLE, mode: true },
      });
    });
  });

  describe('turnOffEmptyPinboardTitleEditMode action', function () {
    it('should return correct action', function () {
      turnOffEmptyPinboardTitleEditMode().should.eql({
        type: PINBOARD_EDIT_MODE,
        payload: { editType: PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_TITLE, mode: false },
      });
    });
  });

  describe('turnOnEmptyPinboardDescriptionEditMode action', function () {
    it('should return correct action', function () {
      turnOnEmptyPinboardDescriptionEditMode().should.eql({
        type: PINBOARD_EDIT_MODE,
        payload: { editType: PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_DESCRIPTION, mode: true },
      });
    });
  });

  describe('turnOffEmptyPinboardDescriptionEditMode action', function () {
    it('should return correct action', function () {
      turnOffEmptyPinboardDescriptionEditMode().should.eql({
        type: PINBOARD_EDIT_MODE,
        payload: { editType: PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_DESCRIPTION, mode: false },
      });
    });
  });

  describe('fetchPinboards', function () {
    it('should return correct action', function () {
      fetchPinboards({ detail: true }).should.eql({
        types: [
          PINBOARDS_FETCH_REQUEST_START,
          PINBOARDS_FETCH_REQUEST_SUCCESS,
          PINBOARDS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: PINBOARDS_URL,
            params: { detail: true },
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
      fetchPinboards({ detail: false }).should.eql({
        types: [
          PINBOARDS_FETCH_REQUEST_START,
          PINBOARDS_FETCH_REQUEST_SUCCESS,
          PINBOARDS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: PINBOARDS_URL,
            params: { detail: false },
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('showPinboardsList action', function () {
    it('should return correct action', function () {
      showPinboardsList().should.eql({
        type: HIDE_SHOW_PINBOARDS_LIST,
        payload: true,
      });
    });
  });

  describe('hidePinboardList action', function () {
    it('should return correct action', function () {
      hidePinboardList().should.eql({
        type: HIDE_SHOW_PINBOARDS_LIST,
        payload: false,
      });
    });
  });
});
