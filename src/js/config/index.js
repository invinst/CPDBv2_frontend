import defaultConfig from './base';


const nodeEnv = process.env.CPDB_APP_ENV;
const configs = {
  'development': require('./development'),
  'production': require('./production'),
  'staging': require('./staging'),
  'test': require('./test')
};

export default {
  ...defaultConfig,
  ...configs[nodeEnv].default
};
