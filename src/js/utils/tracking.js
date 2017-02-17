import axios from 'axios';

import { EVENTS_API_URL } from 'utils/constants';


export function trackIntercomEvent(name, data) {
  Intercom('trackEvent', name, data);
}

export function trackIntercomClickedFaqEvent(id, question, answer) {
  trackIntercomEvent('clicked-faq-item', {
    id: id,
    question: question,
    answer: answer
  });
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
