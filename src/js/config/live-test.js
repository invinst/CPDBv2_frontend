import config from './test';

export default {
  ...config,
  enableFeatures: { pinboard: localStorage.getItem('PINBOARD_ENABLED') !== 'false' },
  appEnv: 'live-test',
};
