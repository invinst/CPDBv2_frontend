import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axiosMockClient from 'utils/axios-mock-client';
import configuredAxiosMiddleware, { getErrorMessage } from 'middleware/configured-axios-middleware';

import {
  requestStories, STORIES_API_URL,
  STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE
} from 'actions/story-app';


const middlewares = [thunk, configuredAxiosMiddleware];
const mockStore = configureMockStore(middlewares);

describe('storyApp actions', function () {
  describe('requestStories', function () {
    afterEach(function () {
      axiosMockClient.reset();
    });

    after(function () {
      axiosMockClient.restore();
    });

    it('should return the right action', function () {
      requestStories().should.eql({
        types: [STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE],
        payload: {
          request: {
            url: STORIES_API_URL,
            params: undefined,
            adapter: axiosMockClient.adapter()
          }
        }
      });
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
      store.dispatch(requestStories({}, adapter)).then(() => {
        store.getActions().should.eql(expectedActions);
      });
    });

    it('should dispatch STORIES_REQUEST_FAILURE', function () {
      axiosMockClient
        .onGet('/stories')
        .reply(400);

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
          type: STORIES_REQUEST_FAILURE,
          payload: new Error(getErrorMessage('/stories', 400)),
          error: true
        }
      ];

      const store = mockStore();
      store.dispatch(requestStories({}, adapter)).then(() => {
        store.getActions().should.eql(expectedActions);
      });
    });
  });
});
