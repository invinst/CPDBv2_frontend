import config from './test';

export default {
  ...config,
  enableFeatures: { pinboard: localStorage.getItem('PINBOARD_ENABLED') !== 'false' },
  apiDomain: `${global.location.protocol}//localhost:${localStorage.getItem('API_DOMAIN_PORT') || 9002}`,
  appEnv: 'integration-test',
  requestRetryDelay: 50,
};
