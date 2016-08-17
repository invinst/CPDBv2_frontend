import BottomSheetReducer from 'reducers/landing-page/bottom-sheet';
import {
  OPEN_BOTTOM_SHEET_WITH_STORY,
  OPEN_BOTTOM_SHEET_WITH_FAQ,
  CLOSE_BOTTOM_SHEET,
  STORY_TYPE,
  FAQ_TYPE
 } from 'actions/landing-page/bottom-sheet';
import StoryFactory from 'utils/test/factories/story';
import FAQFactory from 'utils/test/factories/faq';


describe('BottomSheetReducer', function () {
  it('should return initial state', function () {
    BottomSheetReducer(undefined, {}).should.eql({ content: null });
  });

  it('should handle OPEN_BOTTOM_SHEET_WITH_STORY', function () {
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

  it('should handle OPEN_BOTTOM_SHEET_WITH_FAQ', function () {
    const faq = FAQFactory.build();
    BottomSheetReducer(undefined, {
      type: OPEN_BOTTOM_SHEET_WITH_FAQ,
      payload: faq
    }).should.eql({
      content: {
        type: FAQ_TYPE,
        props: {
          faq: faq
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
