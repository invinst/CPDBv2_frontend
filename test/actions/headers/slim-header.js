import {
  TURN_ON_LOGO_EDIT_MODE,
  TURN_OFF_LOGO_EDIT_MODE,
  TURN_ON_DEMO_VIDEO_EDIT_MODE,
  TURN_OFF_DEMO_VIDEO_EDIT_MODE,
  VIDEO_INFO_REQUEST_START,
  VIDEO_INFO_REQUEST_SUCCESS,
  VIDEO_INFO_REQUEST_FAILURE,
} from 'utils/constants';

import {
  turnOnLogoSectionEditMode,
  turnOffLogoSectionEditMode,
  turnOnDemoVideoSectionEditMode,
  turnOffDemoVideoSectionEditMode,
  fetchVideoInfo,
} from 'actions/headers/slim-header';


describe('Logo section edit mode actions', function () {
  describe('turnOnLogoSectionEditMode', function () {
    it('should have correct type', function () {
      turnOnLogoSectionEditMode().should.eql({
        type: TURN_ON_LOGO_EDIT_MODE,
        payload: undefined,
      });
    });
  });
  describe('turnOffLogoSectionEditMode', function () {
    it('should have correct type', function () {
      turnOffLogoSectionEditMode().should.eql({
        type: TURN_OFF_LOGO_EDIT_MODE,
        payload: undefined,
      });
    });
  });
});

describe('Demo video section edit mode actions', function () {
  describe('turnOnDemoVideoSectionEditMode', function () {
    it('should have correct type', function () {
      turnOnDemoVideoSectionEditMode().should.eql({
        type: TURN_ON_DEMO_VIDEO_EDIT_MODE,
        payload: undefined,
      });
    });
  });
  describe('turnOffDemoVideoSectionEditMode', function () {
    it('should have correct type', function () {
      turnOffDemoVideoSectionEditMode().should.eql({
        type: TURN_OFF_DEMO_VIDEO_EDIT_MODE,
        payload: undefined,
      });
    });
  });
});

describe('Video info actions', function () {
  describe('fetchVideoInfo', function () {
    it('should return the right action', function () {
      fetchVideoInfo().should.eql({
        types: [
          VIDEO_INFO_REQUEST_START,
          VIDEO_INFO_REQUEST_SUCCESS,
          VIDEO_INFO_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: 'https://vimeo.com/api/v2/video/285002059.json',
            params: undefined,
            adapter: null,
            cancelToken: undefined,
            withCredentials: false,
          },
        },
      });
    });
  });
});
