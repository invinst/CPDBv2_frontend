import config from './test';

export default {
  ...config,
  enableFeatures: { pinboard: localStorage.getItem('PINBOARD_ENABLED') !== 'false' },
  appEnv: 'integration-test',
  requestRetryDelay: 50,
};
