import { handleActions } from 'redux-actions';
import { SEARCH_NAVIGATION_LEFT,
         SEARCH_NAVIGATION_DOWN,
         SEARCH_NAVIGATION_RIGHT,
         SEARCH_NAVIGATION_UP } from 'actions/search-page';


export default handleActions({
  [SEARCH_NAVIGATION_LEFT]: ({ columnIndex, itemIndex }, action) => {
    const { suggestionColumns } = action.payload;

    if (columnIndex > 0) {
      const currentColumnSize = suggestionColumns[columnIndex - 1];
      const newColumnIndex = columnIndex - 1;
      const newItemIndex = itemIndex < currentColumnSize - 1 ? itemIndex : currentColumnSize - 1;

      return {
        'columnIndex': newColumnIndex,
        'itemIndex': newItemIndex
      };
    }

    return {
      columnIndex,
      itemIndex
    };
  },

  [SEARCH_NAVIGATION_DOWN]: ({ columnIndex, itemIndex }, action) => {
    const { suggestionColumns } = action.payload;
    const currentColumnSize = suggestionColumns[columnIndex];
    const newItemIndex = itemIndex < currentColumnSize - 1 ? itemIndex + 1 : itemIndex;

    return {
      'columnIndex': columnIndex,
      'itemIndex': newItemIndex
    };
  },

  [SEARCH_NAVIGATION_UP]: ({ columnIndex, itemIndex }, action) => {
    const newItemIndex = itemIndex > 0 ? itemIndex - 1 : itemIndex;

    return {
      'columnIndex': columnIndex,
      'itemIndex': newItemIndex
    };
  },

  [SEARCH_NAVIGATION_RIGHT]: ({ columnIndex, itemIndex }, action) => {
    const { suggestionColumns } = action.payload;
    const numberOfColumns = suggestionColumns.length;

    if (columnIndex < numberOfColumns - 1) {
      const currentColumnSize = suggestionColumns[columnIndex + 1];
      const newItemIndex = itemIndex < currentColumnSize - 1 ? itemIndex : currentColumnSize - 1;

      return {
        'columnIndex': columnIndex + 1,
        'itemIndex': newItemIndex
      };
    }

    return {
      columnIndex,
      itemIndex
    };
  }
}, {
  'columnIndex': 0,
  'itemIndex': 0
});
