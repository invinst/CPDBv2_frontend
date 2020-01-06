import { throttle } from 'lodash';


const clickyLog = (title, type) => global.clicky.log(document.location.pathname, title, type);

export const trackSwipeLandingPageCarousel = (direction, type) => {
  clickyLog(`swipe_${direction}_${type}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'landing_page_carousel',
    eventAction: `swipe_${direction}`,
    eventLabel: type,
  });
};

export const trackOutboundLink = (url, windowName) => {
  clickyLog(url, 'outbound');
  global.ga('send', {
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
  });

  if (windowName) {
    window.open(url, windowName);
  }
};

export const trackPageView = (pathname) => {
  global.ga('send', {
    hitType: 'pageview',
    page: pathname,
  });
};

export const trackSearchResultsCount = (count) => {
  clickyLog(`num_results: ${count}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'num_results',
    eventValue: count,
  });
};

export const trackSingleSearchResults = (contentType, query, resultsCount) => {
  clickyLog(`single_search_query: ${query} with ${resultsCount} results`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: contentType,
    eventAction: 'single_search',
    eventLabel: query,
    eventValue: resultsCount,
  });
};

const _trackSearchFocusedItem = (contentType, query, itemId, rank) => {
  clickyLog(`Item ${itemId} with rank ${rank} is focused`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: contentType,
    eventAction: 'suggestion_click',
    eventLabel: itemId,
    eventValue: rank,
  });

  clickyLog(`Item ${itemId} with rank ${rank} is focused via "${query}" query`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: contentType,
    eventAction: 'suggestion_click_with_query',
    eventLabel: `${ itemId } - ${ query }`,
    eventValue: rank,
  });
};

export const trackSearchFocusedItem = throttle(_trackSearchFocusedItem, 500, { 'leading': false });

function _trackSearchQuery(query) {
  clickyLog(`change_query: ${query}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'change_query',
    eventLabel: query,
  });
}

export const trackSearchQuery = throttle(_trackSearchQuery, 500, { 'leading': false });

export const trackCommunityClick = (communityName) => {
  clickyLog(`community: ${communityName}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'community',
    eventAction: 'click',
    eventLabel: communityName,
  });
};

export const trackOpenExplainer = (officerId) => {
  clickyLog(`open_visual_token_explainer: ${officerId}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'visual_token_explainer',
    eventAction: 'open',
    eventValue: officerId,
  });
};

export const trackOfficerDownload = (officerId, action, label) => {
  clickyLog(`officer_data: ${officerId}`, 'download');
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'officer_data',
    eventAction: action,
    eventValue: officerId,
    eventLabel: label,
  });
};

export const trackOfficerDownloadMenu = (officerId, action) => {
  clickyLog(`open_officer_download_menu: ${officerId}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'officer_download_menu',
    eventAction: action,
    eventValue: officerId,
  });
};

export const trackRelatedByCategoryClick = (sourceCRID, targetCRID) => {
  clickyLog(`related_by_category: Source CRID ${sourceCRID} - Target CRID ${targetCRID}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'related_by_category',
    eventAction: 'click',
    eventLabel: `Source CRID: ${sourceCRID} - Target CRID: ${targetCRID}`,
  });
};

export const trackRelatedByAccusedClick = (sourceCRID, targetCRID) => {
  clickyLog(`related_by_accused: Source CRID ${sourceCRID} - Target CRID ${targetCRID}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'related_by_accused',
    eventAction: 'click',
    eventLabel: `Source CRID: ${sourceCRID} - Target CRID: ${targetCRID}`,
  });
};

export const trackAttachmentClick = (sourceUrl, targetUrl) => {
  clickyLog(`attachment_click: Source URL ${sourceUrl} - Target URL ${targetUrl}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'attachment_click',
    eventAction: 'click',
    eventLabel: `Source URL: ${sourceUrl} - Target URL: ${targetUrl}`,
  });
};

export const trackPopupButtonClick = (sourceUrl, popupName) => {
  clickyLog(`popup_click: ${sourceUrl} - ${popupName}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'popup_click',
    eventAction: 'click',
    eventLabel: `${sourceUrl} - ${popupName}`,
  });
};

export const trackDocumentEdit = (documentID, documentField) => {
  clickyLog(`document_edit: Document ID ${documentID} - Field ${documentField}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'document_edit',
    eventAction: 'edit',
    eventLabel: `Document ID: ${documentID} - Field: ${documentField}`,
  });
};
