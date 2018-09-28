'use strict';

const path = require('path');

const allowedEnvs = ['dev', 'prod', 'staging'];

const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'));
if (isDevServer) {
  process.env['CPDB_APP_ENV'] = 'dev';
}

let env = process.env['CPDB_APP_ENV'];
let isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
if (!isValid) {
  throw 'Invalid env: ' + env;
}

module.exports = require(path.join(__dirname, 'webpack-config/' + env));
