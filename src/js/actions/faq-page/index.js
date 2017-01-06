import { get, authenticatedPost, authenticatedPatch } from 'actions/common/async-action';
import { FAQS_API_URL } from 'utils/constants';


export const FAQS_REQUEST_START = 'FAQS_REQUEST_START';
export const FAQS_REQUEST_SUCCESS = 'FAQS_REQUEST_SUCCESS';
export const FAQS_REQUEST_FAILURE = 'FAQS_REQUEST_FAILURE';

export const requestFAQs = get(
  FAQS_API_URL, [FAQS_REQUEST_START, FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE]
);

export const FAQ_REQUEST_START = 'FAQ_REQUEST_START';
export const FAQ_REQUEST_SUCCESS = 'FAQ_REQUEST_SUCCESS';
export const FAQ_REQUEST_FAILURE = 'FAQ_REQUEST_FAILURE';

export const fetchFAQ = (id) => (get(
  `${FAQS_API_URL}${id}/`,
  [FAQ_REQUEST_START, FAQ_REQUEST_SUCCESS, FAQ_REQUEST_FAILURE]
)());

export const FAQS_POST_START = 'FAQS_POST_START';
export const FAQS_POST_SUCCESS = 'FAQS_POST_SUCCESS';
export const FAQS_POST_FAILURE = 'FAQS_POST_FAILURE';

export const askQuestion = authenticatedPost(
  FAQS_API_URL, [FAQS_POST_START, FAQS_POST_SUCCESS, FAQS_POST_FAILURE]
);

export const UPDATE_FAQ_REQUEST_START = 'UPDATE_FAQ_REQUEST_START';
export const UPDATE_FAQ_REQUEST_SUCCESS = 'UPDATE_FAQ_REQUEST_SUCCESS';
export const UPDATE_FAQ_REQUEST_FAILURE = 'UPDATE_FAQ_REQUEST_FAILURE';

export const updateFAQ = (id, data) => (authenticatedPatch(
  `${FAQS_API_URL}${id}/`,
  [UPDATE_FAQ_REQUEST_START, UPDATE_FAQ_REQUEST_SUCCESS, UPDATE_FAQ_REQUEST_FAILURE]
  )(data)
);
