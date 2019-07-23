import defaultConfig from './base';


const nodeEnv = process.env.CPDB_APP_ENV;
const configs = {
  'dev': require('./dev'),
  'prod': require('./prod'),
  'beta': require('./beta'),
  'staging': require('./staging'),
  'test': require('./test'),
  'live-test': require('./live-test')
};

export default {
  ...defaultConfig,
  ...configs[nodeEnv].default
};
