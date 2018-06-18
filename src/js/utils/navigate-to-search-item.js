import { browserHistory } from 'react-router';

export const navigateToSearchItem = (item, beforeNavigate) => {
  beforeNavigate(item);
  if (item.to) {
    browserHistory.push(item.to);
  } else {
    /* istanbul ignore next */
    window.location.assign(item.url);
  }
};
