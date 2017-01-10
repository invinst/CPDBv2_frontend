import { post } from 'actions/common/async-action';
import { MAIL_CHIMP_URL } from 'utils/constants';


export const SUBSCRIBE_EMAIL_REQUEST = 'SUBSCRIBE_EMAIL_REQUEST';
export const SUBSCRIBE_EMAIL_SUCCESS = 'SUBSCRIBE_EMAIL_SUCCESS';
export const SUBSCRIBE_EMAIL_FAILURE = 'SUBSCRIBE_EMAIL_FAILURE';

export const subscribeEmail = (email) => (post(MAIL_CHIMP_URL, [
  SUBSCRIBE_EMAIL_REQUEST, SUBSCRIBE_EMAIL_SUCCESS, SUBSCRIBE_EMAIL_FAILURE
])({ email }));
