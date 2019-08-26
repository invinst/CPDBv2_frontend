import { handleActions } from 'redux-actions';
import { zipObject, map } from 'lodash';

import { CMS_PAGE_REQUEST_SUCCESS, UPDATE_CMS_PAGE_REQUEST_SUCCESS } from 'utils/constants';

const getCmsPage = (url) => {
  const pattern = /cms-pages\/([\w-]+)/;
  return url.match(pattern)[1];
};

const transformPageObject = obj => ({
  ...obj,
  fields: zipObject(
    map(obj.fields, field => field.name),
    obj.fields
  ),
});

const pages = handleActions({
  [CMS_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [getCmsPage(action.request.url)]: transformPageObject(action.payload),
  }),
  [UPDATE_CMS_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [getCmsPage(action.request.url)]: transformPageObject(action.payload),
  }),
}, {});

export default pages;
