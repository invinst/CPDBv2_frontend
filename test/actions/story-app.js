import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import axiosClient from 'utils/axios-client';

import {
  loadStories, STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE
} from 'actions/story-app';


const middlewares = [thunk];
const mock = new MockAdapter(axiosClient);
const mockStore = configureMockStore(middlewares);

describe('stories actions', function () {
  describe('storiesRequest', function () {
    afterEach(function () {
      mock.reset();
    });

    it('should create STORIES_REQUEST_START and STORIES_SUCCESS when success', function () {
      mock
        .onGet('/stories')
        .reply(200, { stories: [1, 2, 3] });

      const expectedActions = [
        {
          type: STORIES_REQUEST_START,
          payload: undefined
        },
        {
          type: STORIES_REQUEST_SUCCESS,
          payload: [1, 2, 3]
        }
      ];
      const store = mockStore({ stories: [] });

      return store.dispatch(loadStories())
        .then(() => {
          store.getActions().should.eql(expectedActions);
        });
    });

    it('should create STORIES_REQUEST_START and STORIES_FAILURE when failed', function () {
      mock
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
      const store = mockStore({ stories: [] });

      return store.dispatch(loadStories())
        .then(() => {
          store.getActions().should.eql(expectedActions);
        });
    });
  });
});
