# Configured axios middleware development guide

## Introduction

This is the wrapper for [redux-axios-middleware](https://github.com/svrcekmichal/redux-axios-middleware) with our custom configuration, which will dispatch a [FSA](https://github.com/acdlite/flux-standard-action) `onError` and `onSuccess`.

## Usage

Simply using `applyMiddleware` in the real store:

```javascript
import { createStore, applyMiddleware } from 'redux';

createStore(
  ...,
  applyMiddleware(thunk, configuredAxiosMiddleware)
  ...
);
```

or using in mock store like this:

```javascript
import configureMockStore from 'redux-mock-store';

const middlewares = [configuredAxiosMiddleware];
const mockStore = configureMockStore(middlewares);

const store = mockStore();
```

also we provide the `getErrorMessage` which simply return error message when the API return status code out of range `[200~299]`. So you can use it when writing test for some async action. Source code:

```javascript
export const getErrorMessage = (url, status) => (`Request to ${url} failed with status code ${status}.`);
```
