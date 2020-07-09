const { isUndefined, has, get, fromPairs, toPairs, isArray, isEmpty, times, concat, map } = require('lodash');

const hashBody = (body) => isEmpty(body) ? '' : JSON.stringify(body, Object.keys(body).sort());
const return404 = (response) => response.status(404).send();

const splitGetUrl = (requestUrl) => {
  const splittedUrl = requestUrl.split('?');
  const url = splittedUrl[0];
  const params = {};
  for (const [key, value] of new URLSearchParams(splittedUrl[1])) {
    params[key] = value;
  }
  return { url, params };
};

const stringifyObject = (obj) => fromPairs(map(toPairs(obj), ([key, value]) => [key, value.toString()]));

function Request(handleMap, method, url, requestBody) {
  this.method = method;
  this.url = url;
  this.duration = 0;
  this.requestBody = requestBody;
  this.handleMap = handleMap;
  this.responseTimes = -1;
}

Request.prototype.getURLHandlers = function () {
  if (!has(this.handleMap, this.method)) {
    this.handleMap[this.method] = {};
  }
  const methodHandlers = this.handleMap[this.method];
  if (!has(methodHandlers, this.url)) {
    methodHandlers[this.url] = {};
  }
  return methodHandlers[this.url];
};

Request.prototype.reply = function (status, responseBody) {
  const urlHandlers = this.getURLHandlers();
  const delayDuration = this.duration;
  const response = function (res) {
    setTimeout(function () {
      res.status(status).send(responseBody);
    }, delayDuration);
  };
  const handlers = urlHandlers[this.requestBody];
  const replyAll = this.responseTimes === -1;
  if (replyAll) {
    urlHandlers[this.requestBody] = response;
  } else {
    const responses = times(this.responseTimes, () => response);
    if (isUndefined(handlers) || !isArray(handlers)) {
      urlHandlers[this.requestBody] = responses;
    } else {
      urlHandlers[this.requestBody] = concat(handlers, responses);
    }
  }
};

Request.prototype.replyOnce = function (status, responseObj) {
  this.responseTimes = 1;
  this.reply(status, responseObj);
};

Request.prototype.delay = function (duration) {
  this.duration = duration;
  return this;
};

Request.prototype.times = function (times) {
  this.responseTimes = times;
  return this;
};

function Mockapi() {
  this.data = {};
}

Mockapi.prototype.getResponse = function (request) {
  if ((request.method === 'GET') && request.originalUrl.includes('/?')) {
    const { url, params } = splitGetUrl(request.originalUrl);
    request.originalUrl = url;
    request.body = params;
  }
  const urlHandlers = get(this.data, request.method, {})[request.originalUrl];

  if (isUndefined(urlHandlers)) {
    return return404;
  }
  const handlers = urlHandlers[hashBody(request.body)] || urlHandlers[''];
  if (isUndefined(handlers) || (isArray(handlers) && handlers.length === 0)) {
    return return404;
  }
  if (isArray(handlers)) {
    return handlers.shift();
  } else {
    return handlers;
  }
};

Mockapi.prototype.clean = function () {
  this.data = {};
};

Mockapi.prototype.request = function (method, url, requestBody) {
  const hashedBody = hashBody(requestBody);
  return new Request(this.data, method, url, hashedBody);
};

Mockapi.prototype.onGet = function (url, params) {
  const { url: requestUrl, params: urlParams } = splitGetUrl(url);
  return this.request('GET', requestUrl, { ...urlParams, ...stringifyObject(params) });
};

Mockapi.prototype.onPost = function (url, params) {
  return this.request('POST', url, params);
};

Mockapi.prototype.onPut = function (url, params) {
  return this.request('PUT', url, params);
};

Mockapi.prototype.onDelete = function (url, params) {
  return this.request('DELETE', url, params);
};

module.exports = new Mockapi();
