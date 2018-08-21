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
      if (!windowName) {
        document.location = url;
      }
    }
  });

  if (windowName) {
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

