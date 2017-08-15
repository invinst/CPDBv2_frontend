import { createAction } from 'redux-actions';
import { authenticatedPut } from 'actions/common/async-action';
import { UPDATE_ALIAS_URL } from 'utils/constants';

export const SET_ALIAS_ADMIN_PAGE_CONTENT = 'SET_ALIAS_ADMIN_PAGE_CONTENT';
export const setAliasAdminPageContent = createAction(SET_ALIAS_ADMIN_PAGE_CONTENT);

export const UPDATE_ALIAS_REQUEST_START = 'UPDATE_ALIAS_REQUEST_START';
export const UPDATE_ALIAS_REQUEST_SUCCESS = 'UPDATE_ALIAS_REQUEST_SUCCESS';
export const UPDATE_ALIAS_REQUEST_FAILURE = 'UPDATE_ALIAS_REQUEST_FAILURE';

export const updateAliases = (id, type, aliases) => authenticatedPut(
  `${UPDATE_ALIAS_URL}${type}/${id}/`,
  [UPDATE_ALIAS_REQUEST_START, UPDATE_ALIAS_REQUEST_SUCCESS, UPDATE_ALIAS_REQUEST_FAILURE]
)({ aliases: aliases });
