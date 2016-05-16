import _ from 'lodash';


export function innerHeight(el) {
  return _.sumBy(el.children, child => child.getBoundingClientRect().height);
}
