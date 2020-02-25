import browserHistory from 'utils/history';
import { trackOutboundLink } from 'utils/tracking';


export const navigateToSearchItem = (item, beforeNavigate) => {
  beforeNavigate(item);
  if (item.isDataToolSearchUrl) {
    return;
  }
  if (item.to) {
    browserHistory.push(item.to);
  } else if (item.url) {
    trackOutboundLink(item.url, '_blank');
  }
};
