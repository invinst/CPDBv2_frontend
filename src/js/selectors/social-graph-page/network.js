import { compact, filter, get, includes, indexOf, isEmpty, rangeRight, slice } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { officerTransform, coaccusedDataTransform } from 'selectors/common/social-graph';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';

export const getGraphDataOfficers = state => state.socialGraphPage.networkData.graphData['officers'] || [];
export const getCoaccusedData = state => state.socialGraphPage.networkData.graphData['coaccused_data'] || [];
export const getListEvent = state => state.socialGraphPage.networkData.graphData['list_event'] || [];
export const getNetworkAllegations = state => state.socialGraphPage.networkData.networkAllegations;
export const getSelectedOfficerId = state => state.socialGraphPage.networkData.selectedOfficerId;
export const getSelectedEdge = state => state.socialGraphPage.networkData.selectedEdge;
export const getSelectedCrid = state => state.socialGraphPage.networkData.selectedCrid;
export const getRequesting = state => state.socialGraphPage.networkData.requesting;

export const officersSelector = createSelector(
  [getGraphDataOfficers],
  officers => officers.map(officerTransform)
);

export const coaccusedDataSelector = createSelector(
  [getCoaccusedData],
  coaccusedData => coaccusedData.map(coaccusedDataTransform)
);

export const attachmentTransform = attachment => ({
  fileType: attachment['file_type'],
  previewImageUrl: attachment['preview_image_url'],
  title: attachment['title'],
  url: attachment['url'],
  id: attachment['id'],
});

export const allegationTransform = item => {
  return {
    crid: item['crid'],
    kind: NEW_TIMELINE_ITEMS.CR,
    incidentDate: moment(item['incident_date']).format('MMM D').toUpperCase(),
    year: moment(item['incident_date']).year(),
    category: get(item, 'category', 'Unknown'),
    subcategory: get(item, 'subcategory', 'Unknown'),
    attachments: get(item, 'attachments', []).map(attachmentTransform),
    key: item['crid'],
    timelineIdx: item['timelineIdx'],
  };
};

export const yearItem = (baseItem, year, hasData) => ({
  kind: NEW_TIMELINE_ITEMS.YEAR,
  date: year,
  key: `${baseItem.key}-${NEW_TIMELINE_ITEMS.YEAR}-${year}`,
  hasData,
});

export const gapYearItems = (fromItem, toItem) => {
  let years = rangeRight(toItem.year, fromItem.year);
  years = slice(years, 0, years.length - 1);

  return years.map((year) => yearItem(toItem, year, false));
};

export const fillYears = (items) => {
  let newItems = [];
  newItems.push(yearItem(items[0], items[0].year, true));

  items.forEach((currentItem, index) => {
    newItems.push(currentItem);

    if (index < items.length - 1) {
      const nextItem = items[index + 1];
      newItems = newItems.concat(gapYearItems(currentItem, nextItem));

      if (nextItem.year !== currentItem.year) {
        newItems.push(yearItem(nextItem, nextItem.year, true));
      }
    }
  });

  return newItems;
};

export const transformSocialGraphAllegationItems = (items, listEvents) => {
  if (isEmpty(items)) {
    return [];
  }

  if (listEvents) {
    items.forEach((item) => {
      const itemTimelineIdx = indexOf(listEvents, item.incident_date);
      if (itemTimelineIdx !== -1) {
        item.timelineIdx = itemTimelineIdx;
      }
    });
  }

  const transformedItems = compact(items.map(allegationTransform));
  return fillYears(transformedItems);
};

export const edgeCoaccusalsItemsSelector = createSelector(
  getNetworkAllegations,
  getSelectedEdge,
  (items, selectedEdge) => {
    if (selectedEdge) {
      const sourceId = selectedEdge.sourceUid;
      const targetId = selectedEdge.targetUid;
      return filter(
        items, item => includes(item['officer_ids'], sourceId) && includes(item['officer_ids'], targetId)
      );
    }
  }
);

export const selectedEdgeDataSelector = createSelector(
  getSelectedEdge,
  edgeCoaccusalsItemsSelector,
  (selectedEdge, edgeCoaccusalsItems) => {
    if (selectedEdge) {
      return { ...selectedEdge, coaccusedCount: edgeCoaccusalsItems.length };
    }
  }
);
