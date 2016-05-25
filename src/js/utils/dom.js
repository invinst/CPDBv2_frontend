import _ from 'lodash';


export function innerHeight(el) {
  return _.sumBy(el.children, child => child.getBoundingClientRect().height);
}

export function disableBodyScroll() {
  document.body.className += ' noscroll';
}

export function enableBodyScroll() {
  document.body.className = document.body.className.replace(/noscroll/g, '');
}
