import { sumBy } from 'lodash';

import { HEADER_TOP_BAR_HEIGHT } from 'utils/constants';

// Disable scroll restoration feature from Chrome
// which has undesirable behaviors for our SPA
/* istanbul ignore next */
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export function innerHeight(el) {
  return sumBy(el.children, child => child.getBoundingClientRect().height);
}

export function viewportHeight() {
/* istanbul ignore next */
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

/* istanbul ignore next */
function _fullDocumentHeight() {
  // height of whole document including parts outside the visible viewport
  const body = document.body;
  const html = document.documentElement;
  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

export const fullDocumentHeight = _fullDocumentHeight;

export function bodyScrollPosition() {
  /* istanbul ignore next */
  return Math.max(document.documentElement.scrollTop, (window.scrollY || 0));
}

export function isScrolledToBottom() {
  // +20 px to be more lenient, which also works around the edge case
  // where the horizontal scrollbar causes a false negative
  /* istanbul ignore next */
  return viewportHeight() + bodyScrollPosition() + 20 >= fullDocumentHeight();
}

export function calculatePosition(offset = 0) {
  /* istanbul ignore next */
  if (bodyScrollPosition() <= offset) {
    return 'top';
  } else if (isScrolledToBottom()) {
    return 'bottom';
  } else {
    return 'middle';
  }
}

export function calculateSlimHeaderPosition() {
  return calculatePosition(HEADER_TOP_BAR_HEIGHT);
}

export function disableBodyScroll() {
  if (document.body.className.indexOf('noscroll') === -1) {
    document.body.className += ' noscroll';
  }
}

export function enableBodyScroll() {
  document.body.className = document.body.className.replace(/noscroll/g, '');
}

export function getCurrentPathname() {
  return window.location.pathname;
}

export function changePageTitle(title) {
  document.title = title;
}

export function scrollToElement(selector, alignToTop=true, offset=0) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView(alignToTop);
    window.scrollBy(0, offset);
  }
}

/* istanbul ignore next */
export function scrollToTop() {
  window.scrollTo(0, 0);
}
