import config from './test';

const apiDomain = `${global.location.protocol}//localhost:${localStorage.getItem('API_DOMAIN_PORT') || 9002}`;

export default {
  ...config,
  enableFeatures: { pinboard: localStorage.getItem('PINBOARD_ENABLED') !== 'false' },
  apiDomain,
  heatMapContainer: `${apiDomain}/heatmap/`,
  appEnv: 'integration-test',
  requestRetryDelay: 50,
};
