# Async action creators development guide

## Introduction
We are using [redux-axios-middleware](https://github.com/svrcekmichal/redux-axios-middleware), so we only need to define actions supported by it to build an async action, for example:

```javascript
export const STORIES_REQUEST_START = 'STORIES_REQUEST_START';
export const STORIES_REQUEST_SUCCESS = 'STORIES_REQUEST_SUCCESS';
export const STORIES_REQUEST_FAILURE = 'STORIES_REQUEST_FAILURE';

export const STORIES_API_URL = '/stories';

export const requestStories = (params, adapter) => ({
  types: [STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE],
  payload: {
    request: {
      url: STORIES_API_URL,
      params,
      adapter
    }
  }
});
```

## How to test
We assume that you know how to test Async action creators recommended by redux, if you didn't know it yet please read [the testing guide](http://redux.js.org/docs/recipes/WritingTests.html) by redux first. On previous example, we left the room for adapter here which is used for testing purpose:

```javascript
request: {
  url: STORIES_API_URL,
  params,
  adapter
}
```
So we need to pass the mock adapter there to test it out:
```javascript
import axiosMockClient from 'utils/axios-mock-client';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import {
  requestStories, STORIES_API_URL,
  STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE
} from 'actions/story-app';

const middlewares = [configuredAxiosMiddleware];
const mockStore = configureMockStore(middlewares);

describe('request action', function () {
  afterEach(function () {
    axiosMockClient.reset();
  });

  after(function () {
    axiosMockClient.restore();
  });

  it('should dispatch STORIES_REQUEST_SUCCESS', function () {
    axiosMockClient
      .onGet('/stories')
      .reply(200, { stories: [1, 2, 3] });

    const adapter = axiosMockClient.adapter();

    const expectedActions = [
      {
        type: STORIES_REQUEST_START,
        payload: {
          request: {
            url: STORIES_API_URL,
            params: {},
            adapter
          }
        },
        types: [STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE]
      },
      {
        type: STORIES_REQUEST_SUCCESS,
        payload: {
          stories: [1, 2, 3]
        }
      }
    ];

    const store = mockStore();
    return store.dispatch(requestStories({}, adapter)).then(() => {
      store.getActions().should.eql(expectedActions);
    });
  });
});
```
