import { request } from 'actions/common/async-action';


export const FAQS_REQUEST_START = 'FAQS_REQUEST_START';
export const FAQS_REQUEST_SUCCESS = 'FAQS_REQUEST_SUCCESS';
export const FAQS_REQUEST_FAILURE = 'FAQS_REQUEST_FAILURE';

export const FAQS_API_URL = 'faqs/';

export const requestFAQs = request(FAQS_API_URL, [FAQS_REQUEST_START, FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE]);
