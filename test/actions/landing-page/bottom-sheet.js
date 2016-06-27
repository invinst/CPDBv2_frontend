import {
  OPEN_BOTTOM_SHEET_WITH_STORY, CLOSE_BOTTOM_SHEET, openBottomSheetWithStory, closeBottomSheet
} from 'actions/landing-page/bottom-sheet';
import StoryFactory from 'utils/test/factories/story';


describe('bottomSheet actions', function () {
  describe('openBottomSheet', function () {
    it('should return right action', function () {
      const story = StoryFactory.build();
      openBottomSheetWithStory(story).should.eql({
        type: OPEN_BOTTOM_SHEET_WITH_STORY,
        payload: story
      });
    });
  });

  describe('closeBottomSheet', function () {
    it('should return right action', function () {
      closeBottomSheet().should.eql({
        type: CLOSE_BOTTOM_SHEET,
        payload: undefined
      });
    });
  });
});
