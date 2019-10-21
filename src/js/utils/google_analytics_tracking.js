import { throttle } from 'lodash';


export const trackSwipeLanddingPageCarousel = (direction, type) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'landing_page_carousel',
    eventAction: `swipe_${direction}`,
    eventLabel: type,
  });
};

export const trackOutboundLink = (url, windowName) => {
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
    /* istanbul ignore next */
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
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'num_results',
    eventValue: count,
  });
};

export const trackSingleSearchResults = (contentType, query, resultsCount) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: contentType,
    eventAction: 'single_search',
    eventLabel: query,
    eventValue: resultsCount,
  });
};

const _trackSearchFocusedItem = (contentType, query, itemId, rank) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: contentType,
    eventAction: 'view_search_preview',
    eventLabel: itemId,
    eventValue: rank,
  });

  global.ga('send', {
    hitType: 'event',
    eventCategory: contentType,
    eventAction: 'view_search_preview_with_query',
    eventLabel: `${ itemId } - ${ query }`,
    eventValue: rank,
  });
};

export const trackSearchFocusedItem = throttle(_trackSearchFocusedItem, 500, { 'leading': false });

export function trackSearchQuery(query) {
  this.throttledSearchQueryGA = this.throttledSearchQueryGA || throttle(global.ga, 500, { 'leading': false });
  this.throttledSearchQueryGA('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'change_query',
    eventLabel: query,
  });
}

export const trackCommunityClick = (communityName) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'community',
    eventAction: 'click',
    eventLabel: communityName,
  });
};

export const trackOpenExplainer = (officerId) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'visual_token_explainer',
    eventAction: 'open',
    eventValue: officerId,
  });
};

export const trackOfficerDownload = (officerId, action, label) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'officer_data',
    eventAction: action,
    eventValue: officerId,
    eventLabel: label,
  });
};

export const trackOfficerDownloadMenu = (officerId, action) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'officer_download_menu',
    eventAction: action,
    eventValue: officerId,
  });
};

export const trackRelatedByCategoryClick = (sourceCRID, targetCRID) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'related_by_category',
    eventAction: 'click',
    eventLabel: `Source CRID: ${sourceCRID} - Target CRID: ${targetCRID}`,
  });
};

export const trackRelatedByAccusedClick = (sourceCRID, targetCRID) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'related_by_accused',
    eventAction: 'click',
    eventLabel: `Source CRID: ${sourceCRID} - Target CRID: ${targetCRID}`,
  });
};

export const trackAttachmentClick = (sourceUrl, targetUrl) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'attachment_click',
    eventAction: 'click',
    eventLabel: `Source URL: ${sourceUrl} - Target URL: ${targetUrl}`,
  });
};

export const trackPopupButtonClick = (sourceUrl, popupName) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'popup_click',
    eventAction: 'click',
    eventLabel: `${sourceUrl} - ${popupName}`,
  });
};

export const trackDocumentEdit = (documentID, documentField) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'document_edit',
    eventAction: 'edit',
    eventLabel: `Document ID: ${documentID} - Field: ${documentField}`,
  });
};
