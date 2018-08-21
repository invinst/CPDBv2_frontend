export const trackOpenExplainer = (officerId) => {
  window.Intercom('trackEvent', 'visual_token_explainer', { officerId });
};
