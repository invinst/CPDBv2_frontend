import pinItemFromPreviewPaneReducer from 'reducers/pinboard-page/pin-item-from-preview-pane';
import should from 'should';

import {
  ADD_ITEM_TO_PINBOARD_STATE,
  REMOVE_ITEM_FROM_PINBOARD_STATE,
  ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE,
} from 'utils/constants';


describe('pinItemFromPreviewPane reducer', function () {
  it('should have initial state', function () {
    should(pinItemFromPreviewPaneReducer(undefined, {})).be.eql({});
  });

  it('should handle ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE', function () {
    pinItemFromPreviewPaneReducer(undefined,
      {
        type: ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE,
        payload: {
          id: '123456',
          type: 'OFFICER',
          isPinned: true,
        },
      }
    ).should.eql({
      id: '123456',
      type: 'OFFICER',
      isPinned: true,
    });
  });

  it('should handle ADD_ITEM_TO_PINBOARD_STATE', function () {
    pinItemFromPreviewPaneReducer(undefined,
      {
        type: ADD_ITEM_TO_PINBOARD_STATE,
        payload: {
          id: '123456',
          type: 'OFFICER',
          isPinned: true,
        },
      }
    ).should.eql({});
  });

  it('should handle REMOVE_ITEM_FROM_PINBOARD_STATE', function () {
    pinItemFromPreviewPaneReducer(undefined,
      {
        type: REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          id: '123456',
          type: 'OFFICER',
          isPinned: true,
        },
      }
    ).should.eql({});
  });
});
