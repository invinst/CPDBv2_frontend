import defaultConfig from './base';


const nodeEnv = process.env.CPDB_APP_ENV;
const configs = {
  'dev': require('./dev'),
  'prod': require('./prod'),
  'staging': require('./staging'),
  'test': require('./test')
};

export default {
  ...defaultConfig,
  ...configs[nodeEnv].default
};
