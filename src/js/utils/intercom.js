export function trackClickedFaqItem(id, question, answer) {
  Intercom('trackEvent', 'clicked-faq-item', {
    id: id,
    question: question,
    answer: answer.join('. ')
  });
}

export function trackClickedReportingItem(id, title) {
  Intercom('trackEvent', 'clicked-reporting-item', {
    id: id,
    title: title
  });
}
