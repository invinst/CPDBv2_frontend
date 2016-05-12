import { createAction } from 'redux-actions';
import axiosClient from 'utils/axios-client';


export const STORIES_REQUEST_START = 'STORIES_REQUEST_START';
export const STORIES_REQUEST_SUCCESS = 'STORIES_REQUEST_SUCCESS';
export const STORIES_REQUEST_FAILURE = 'STORIES_REQUEST_FAILURE';

const storiesRequest = createAction(STORIES_REQUEST_START);
const storiesSuccess = createAction(STORIES_REQUEST_SUCCESS, data => data.stories);
const storiesFailure = createAction(STORIES_REQUEST_FAILURE);

export function loadStories() {
  return dispatch => {
    dispatch(storiesRequest());
    return axiosClient.get('/stories')
      .then(res => dispatch(storiesSuccess(res.data)))
      .catch(err => dispatch(storiesFailure(new Error('Load failed'))));
  };
}
