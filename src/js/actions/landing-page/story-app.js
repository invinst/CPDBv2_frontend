import { get } from 'actions/common/async-action';


export const STORIES_REQUEST_START = 'STORIES_REQUEST_START';
export const STORIES_REQUEST_SUCCESS = 'STORIES_REQUEST_SUCCESS';
export const STORIES_REQUEST_FAILURE = 'STORIES_REQUEST_FAILURE';

export const STORIES_API_URL = 'stories/';

export const requestStories = get(
  STORIES_API_URL, [STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE]
);
