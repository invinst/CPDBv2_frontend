import axios from 'axios';
import { throttle } from 'lodash';

import { EVENTS_API_URL } from 'utils/constants';


export function trackIntercomEvent(name, data) {
  Intercom('trackEvent', name, data);
}

export function trackIntercomClickedReportEvent(id, title) {
  trackIntercomEvent('clicked-reporting-item', {
    id: id,
    title: title
  });
}

export function trackInternalEvent(name, data) {
  axios.post(EVENTS_API_URL, {
    name: name,
    data: data
  });
}

export const trackOutboundLink = url => {
  /* istanbul ignore next */
  global.ga('send', 'event', 'outbound', 'click', url, {
    transport: 'beacon',
    hitCallback: () => { document.location = url; }
  });
};

export const throttledGA = throttle(global.ga, 500);
