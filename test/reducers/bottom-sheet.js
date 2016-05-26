import BottomSheetReducer from 'reducers/bottom-sheet';
import { OPEN_BOTTOM_SHEET_WITH_STORY, CLOSE_BOTTOM_SHEET, STORY_TYPE } from 'actions/bottom-sheet';
import StoryFactory from 'utils/test/factories/story';


describe('BottomSheetReducer', function () {
  it('should return initial state', function () {
    BottomSheetReducer(undefined, {}).should.eql({ content: null });
  });

  it('should handle OPEN_BOTTOM_SHEET', function () {
    const story = StoryFactory.build();
    BottomSheetReducer(undefined, {
      type: OPEN_BOTTOM_SHEET_WITH_STORY,
      payload: story
    }).should.eql({
      content: {
        type: STORY_TYPE,
        props: {
          story: story
        }
      }
    });
  });

  it('should handle CLOSE_BOTTOM_SHEET', function () {
    BottomSheetReducer(undefined, {
      type: CLOSE_BOTTOM_SHEET,
      payload: undefined
    }).should.eql({ content: null });
  });
});
