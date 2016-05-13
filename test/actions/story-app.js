import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axiosMockClient from 'utils/axios-mock-client';

import {
  loadStories, STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE
} from 'actions/story-app';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('stories actions', function () {
  describe('storiesRequest', function () {
    afterEach(function () {
      axiosMockClient.reset();
    });

    after(function () {
      axiosMockClient.restore();
    });

    it('should create STORIES_REQUEST_START and STORIES_SUCCESS when success', function () {
      axiosMockClient
        .onGet('/stories')
        .reply(200, { stories: [1, 2, 3] });

      const expectedActions = [
        {
          type: STORIES_REQUEST_START,
          payload: undefined
        },
        {
          type: STORIES_REQUEST_SUCCESS,
          payload: {
            stories: [1, 2, 3]
          }
        }
      ];
      const store = mockStore();

      return store.dispatch(loadStories())
        .then(() => {
          store.getActions().should.eql(expectedActions);
        });
    });

    it('should create STORIES_REQUEST_START and STORIES_FAILURE when failed', function () {
      axiosMockClient
        .onGet('/stories')
        .reply(404);

      const expectedActions = [
        {
          type: STORIES_REQUEST_START,
          payload: undefined
        },
        {
          type: STORIES_REQUEST_FAILURE,
          payload: new Error('Load failed'),
          error: true
        }
      ];
      const store = mockStore();

      return store.dispatch(loadStories())
        .then(() => {
          store.getActions().should.eql(expectedActions);
        });
    });
  });
});
