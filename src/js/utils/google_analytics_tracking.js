import { throttle } from 'lodash';


export const trackSwipeLanddingPageCarousel = (direction, type) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'landing_page_carousel',
    eventAction: `swipe_${direction}`,
    eventLabel: type
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
    }
  });

  if (windowName) {
    /* istanbul ignore next */
    window.open(url, windowName);
  }
};

export const trackPageView = (pathname) => {
  global.ga('send', {
    hitType: 'pageview',
    page: pathname
  });
};

export const trackSearchResultsCount = (count) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'num_results',
    eventValue: count
  });
};

export function trackSearchQuery(query) {
  this.throttledSearchQueryGA = this.throttledSearchQueryGA || throttle(global.ga, 500, { 'leading': false });
  this.throttledSearchQueryGA('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'change_query',
    eventLabel: query
  });
}

export const trackCommunityClick = (communityName) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'community',
    eventAction: 'click',
    eventLabel: communityName
  });
};

export const trackOpenExplainer = (officerId) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'visual_token_explainer',
    eventAction: 'open',
    eventValue: officerId
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
