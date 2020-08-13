const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const wdioConfig = require('../wdio.conf').config;

// FIXME: Refactor the path here
const api = require(__dirname + '/mock-api');

const server = http.createServer(app);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors({
  origin: wdioConfig.baseUrl,
  credentials: true,
}));

// We haven't handle our api-server for specific params yet
// TODO: Handle parameters here
app.use('/*', function (req, res) {
  api.getResponse(req)(res);
});


module.exports = function (domainPort=9002) {
  console.info(`API Server has been started at port ${domainPort}`);
  server.listen(domainPort);
  return server;
};
