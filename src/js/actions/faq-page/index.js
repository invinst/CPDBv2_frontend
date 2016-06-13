import { request } from 'actions/common/async-action';


export const FAQ_PAGE_REQUEST_START = 'FAQ_PAGE_REQUEST_START';
export const FAQ_PAGE_REQUEST_SUCCESS = 'FAQ_PAGE_REQUEST_SUCCESS';
export const FAQ_PAGE_REQUEST_FAILURE = 'FAQ_PAGE_REQUEST_FAILURE';

export const FAQ_PAGE_API_URL = 'faqs/';

export const requestFAQs = request(
  FAQ_PAGE_API_URL, [FAQ_PAGE_REQUEST_START, FAQ_PAGE_REQUEST_SUCCESS, FAQ_PAGE_REQUEST_FAILURE]
);
