import { throttle, isEmpty, get, pick } from 'lodash';

import axiosClient from 'utils/axios-client';
import { TRACKING_API_URL } from 'utils/constants';


const analyticTrackingParams = ({ clickyData, gaData }) => {
  let trackingParams = {};
  if (!isEmpty(clickyData)) {
    trackingParams['clicky'] = pick(clickyData, ['type', 'href', 'title']);
  }
  if (!isEmpty(gaData)) {
    trackingParams['ga'] = {
      'hit_type': gaData.hitType,
      'event_category': gaData.eventCategory,
      'event_action': gaData.eventAction,
      'event_label': gaData.eventLabel,
      'event_value': gaData.eventValue,
      'page': gaData.page,
    };
  }
  return trackingParams;
};

const sendAnalyticTracking = (data) => {
  const callback = get(data, 'gaData.hitCallback');
  axiosClient.post(TRACKING_API_URL, analyticTrackingParams(data))
    .finally(() => {
      callback && callback();
    });
};

const analyticTracking = ({ clickyData, gaData }) => {
  let serverSideTrackingData = {};
  clickyData['href'] = document.location.pathname;
  if (!global.clicky) {
    serverSideTrackingData['clickyData'] = clickyData;
  }
  if (!global.gaLoaded) {
    serverSideTrackingData['gaData'] = gaData;
  }

  if (!isEmpty(serverSideTrackingData)) {
    sendAnalyticTracking(serverSideTrackingData);
  }

  if (global.clicky && !clickyData.defaultTracking) {
    global.clicky.log(clickyData.href, clickyData.title, clickyData.type);
  }
  global.gaLoaded && global.ga('send', gaData);
};

export const trackSwipeLandingPageCarousel = (direction, type) => {
  analyticTracking({
    clickyData: {
      title: `swipe_${direction}_${type}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'landing_page_carousel',
      eventAction: `swipe_${direction}`,
      eventLabel: type,
    },
  });
};

export const trackOutboundLink = (url, windowName) => {
  analyticTracking({
    clickyData: {
      title: url,
      type: 'outbound',
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'outbound',
      eventAction: 'click',
      eventLabel: url,
      transport: 'beacon',
      hitCallback: () => {
        /* istanbul ignore next */
        if (!windowName) {
          document.location = url;
        }
      },
    },
  });

  if (windowName) {
    window.open(url, windowName);
  }
};

export const trackPageView = (pathname) => {
  analyticTracking({
    clickyData: {
      type: 'pageview',
      defaultTracking: true,
    },
    gaData: {
      hitType: 'pageview',
      page: pathname,
    },
  });
};

export const trackSearchResultsCount = (count) => {
  analyticTracking({
    clickyData: {
      title: `num_results: ${count}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'search',
      eventAction: 'num_results',
      eventValue: count,
    },
  });
};

export const trackSingleSearchResults = (contentType, query, resultsCount) => {
  analyticTracking({
    clickyData: {
      title: `single_search_query: ${query} with ${resultsCount} results`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: contentType,
      eventAction: 'single_search',
      eventLabel: query,
      eventValue: resultsCount,
    },
  });
};

const _trackSearchFocusedItem = (contentType, query, itemId, rank) => {
  analyticTracking({
    clickyData: {
      title: `Item ${itemId} with rank ${rank} is focused`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: contentType,
      eventAction: 'suggestion_click',
      eventLabel: itemId,
      eventValue: rank,
    },
  });
  analyticTracking({
    clickyData: {
      title: `Item ${itemId} with rank ${rank} is focused via "${query}" query`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: contentType,
      eventAction: 'suggestion_click_with_query',
      eventLabel: `${ itemId } - ${ query }`,
      eventValue: rank,
    },
  });
};

export const trackSearchFocusedItem = throttle(_trackSearchFocusedItem, 500, { 'leading': false });

function _trackSearchQuery(query) {
  analyticTracking({
    clickyData: {
      title: `change_query: ${query}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'search',
      eventAction: 'change_query',
      eventLabel: query,
    },
  });
}

export const trackSearchQuery = throttle(_trackSearchQuery, 500, { 'leading': false });

export const trackCommunityClick = (communityName) => {
  analyticTracking({
    clickyData: {
      title: `community: ${communityName}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'community',
      eventAction: 'click',
      eventLabel: communityName,
    },
  });
};

export const trackOpenExplainer = (officerId) => {
  analyticTracking({
    clickyData: {
      title: `open_visual_token_explainer: ${officerId}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'visual_token_explainer',
      eventAction: 'open',
      eventValue: officerId,
    },
  });
};

export const trackOfficerDownload = (officerId, action, label) => {
  analyticTracking({
    clickyData: {
      title: `officer_data: ${officerId}`,
      type: 'download',
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'officer_data',
      eventAction: action,
      eventValue: officerId,
      eventLabel: label,
    },
  });
};

export const trackOfficerDownloadMenu = (officerId, action) => {
  analyticTracking({
    clickyData: {
      title: `open_officer_download_menu: ${officerId}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'officer_download_menu',
      eventAction: action,
      eventValue: officerId,
    },
  });
};

export const trackRelatedByCategoryClick = (sourceCRID, targetCRID) => {
  analyticTracking({
    clickyData: {
      title: `related_by_category: Source CRID ${sourceCRID} - Target CRID ${targetCRID}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'related_by_category',
      eventAction: 'click',
      eventLabel: `Source CRID: ${sourceCRID} - Target CRID: ${targetCRID}`,
    },
  });
};

export const trackRelatedByAccusedClick = (sourceCRID, targetCRID) => {
  analyticTracking({
    clickyData: {
      title: `related_by_accused: Source CRID ${sourceCRID} - Target CRID ${targetCRID}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'related_by_accused',
      eventAction: 'click',
      eventLabel: `Source CRID: ${sourceCRID} - Target CRID: ${targetCRID}`,
    },
  });
};

export const trackAttachmentClick = (sourceUrl, targetUrl) => {
  analyticTracking({
    clickyData: {
      title: `attachment_click: Source URL ${sourceUrl} - Target URL ${targetUrl}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'attachment_click',
      eventAction: 'click',
      eventLabel: `Source URL: ${sourceUrl} - Target URL: ${targetUrl}`,
    },
  });
};

export const trackPopupButtonClick = (sourceUrl, popupName) => {
  analyticTracking({
    clickyData: {
      title: `popup_click: ${sourceUrl} - ${popupName}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'popup_click',
      eventAction: 'click',
      eventLabel: `${sourceUrl} - ${popupName}`,
    },
  });
};

export const trackDocumentEdit = (documentID, documentField) => {
  analyticTracking({
    clickyData: {
      title: `document_edit: Document ID ${documentID} - Field ${documentField}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'document_edit',
      eventAction: 'edit',
      eventLabel: `Document ID: ${documentID} - Field: ${documentField}`,
    },
  });
};
