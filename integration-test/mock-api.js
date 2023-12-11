const {
  isUndefined, has, get,
  isArray, isEmpty, times,
  concat, map, isFunction, reduce, trimEnd,
} = require('lodash');

const sortObjectValues = (obj) => reduce(obj || {}, (sortedObject, value, key) => {
  if (isArray(value)) {
    sortedObject[key] = value.sort();
  } else {
    sortedObject[key] = value;
  }
  return sortedObject;
}, {});

const hashBody = (body) => isEmpty(body) ? '' : JSON.stringify(sortObjectValues(body), Object.keys(body).sort());
const return404 = (response) => response.status(404).send();

const parseUrlParams = (paramsString) => {
  if (isUndefined(paramsString)) {
    return {};
  }
  const params = {};
  for (const [key, value] of new URLSearchParams(paramsString)) {
    if (key.endsWith('[]')) {
      const splitKey = key.substr(0, key.length - 2);
      params[splitKey] = [...(params[splitKey] || []), value];
    } else {
      params[key] = value;
    }
  }
  return params;
};

const splitGetUrl = (requestUrl) => {
  const splittedUrl = requestUrl.split('?');
  const url = splittedUrl[0];
  const params = parseUrlParams(splittedUrl[1]);
  return { url, params };
};

const stringifyObject = obj => reduce(obj || {}, (stringifiedObj, value, key) => {
  if (isArray(value)) {
    stringifiedObj[key] = map(value, v => v.toString());
  } else {
    stringifiedObj[key] = value.toString();
  }
  return stringifiedObj;
}, {});

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
  const response = function (request) {
    return function (res) {
      setTimeout(function () {
        if (isFunction(status)) {
          const result = status(request);

          res.status(result[0]).send(result[1]);
        } else {
          res.status(status).send(responseBody);
        }
      }, delayDuration);
    };
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
  const urlHandlers = get(this.data, request.method, {})[trimEnd(request.baseUrl, '/')];

  if (isUndefined(urlHandlers)) {
    return return404;
  }
  const hashedBody = hashBody(request.method === 'GET' ? request.query : request.body);
  const handlers = urlHandlers[hashedBody] || urlHandlers[''];
  if (isUndefined(handlers) || (isArray(handlers) && handlers.length === 0)) {
    return return404;
  }
  const reponseHandler = isArray(handlers) ? handlers.shift() : handlers;
  return reponseHandler(request);
};

Mockapi.prototype.clean = function () {
  this.data = {};
};

Mockapi.prototype.request = function (method, url, requestBody) {
  const hashedBody = hashBody(requestBody);
  return new Request(this.data, method, trimEnd(url, '/'), hashedBody);
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

Mockapi.prototype.onPatch = function (url, params) {
  return this.request('PATCH', url, params);
};

Mockapi.prototype.onDelete = function (url, params) {
  return this.request('DELETE', url, params);
};

module.exports = new Mockapi();
