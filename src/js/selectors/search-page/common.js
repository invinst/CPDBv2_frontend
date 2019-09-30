export const getQuery = state => state.searchPage.query;

export const isItemPinned = (pinnedItemType, id, pinboardItems) => {
  return (pinboardItems.hasOwnProperty(pinnedItemType)) &&
         (pinboardItems[pinnedItemType].indexOf(String(id)) !== -1);
};
