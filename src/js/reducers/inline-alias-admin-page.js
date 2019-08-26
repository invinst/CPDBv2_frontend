import { handleActions } from 'redux-actions';
import { toPairs } from 'lodash';

import {
  SET_ALIAS_ADMIN_PAGE_CONTENT,
  UPDATE_ALIAS_REQUEST_START,
  UPDATE_ALIAS_REQUEST_FAILURE,
} from 'actions/inline-alias-admin-page';


export default handleActions({
  [SET_ALIAS_ADMIN_PAGE_CONTENT]: (state, { payload: { id, type, text, description, existingAliases } }) => ({
    id, type, text, description, existingAliases, errorMessage: '',
  }),
  [UPDATE_ALIAS_REQUEST_FAILURE]: (state, { payload: { message } }) => ({
    ...state,
    errorMessage: typeof message === 'string' ? message : (
      toPairs(message).map(([field, errors]) => `${field}: ${errors.join(' ')}`).join(' - ')
    ),
  }),
  [UPDATE_ALIAS_REQUEST_START]: (state, { payload }) => ({
    ...state,
    errorMessage: '',
  }),
}, {});
