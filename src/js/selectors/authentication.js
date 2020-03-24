import { get, isEmpty } from 'lodash';

export const isSignedIn = state => !isEmpty(get(state, 'authentication.apiAccessToken', ''));
