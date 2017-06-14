import { sumBy } from 'lodash';


export function innerHeight(el) {
  return sumBy(el.children, child => child.getBoundingClientRect().height);
}

export function viewportHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
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

export function windowAddEventListener(event, callback) {
  window.addEventListener(event, callback);
}

export function windowRemoveEventListener(event, callback) {
  window.removeEventListener(event, callback);
}

export function setMetaAttribute(name, content) {
  let metaEl = document.evaluate(
    `//meta[@name="${name}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  if (metaEl === null) {
    metaEl = document.createElement('META');
    metaEl.setAttribute('name', name);
    const headEl = document.getElementsByTagName('HEAD')[0];
    headEl.appendChild(metaEl);
  }
  metaEl.setAttribute('content', content);
}

export function changePageDescription(description) {
  setMetaAttribute('description', description);
}
