import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import * as constants from 'utils/constants';
import { getFormatId } from 'utils/pinboard';


const defaultState = {
  'id': null,
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
  'saving': false,
  'isPinboardRestored': false,
};

export default handleActions({
  [constants.PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isPinboardRestored: true,
  }),
  [constants.PINBOARD_CREATE_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      id: action.payload.id,
      saving: false,
    };
  },
  [constants.PINBOARD_CREATE_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      saving: false,
    };
  },
  [constants.PINBOARD_UPDATE_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      saving: false,
      'example_pinboards': action.payload['example_pinboards'],
    };
  },
  [constants.PINBOARD_UPDATE_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      saving: false,
    };
  },
  [constants.PINBOARD_CREATE_REQUEST_START]: (state, action) => ({
    ...state,
    saving: true,
  }),
  [constants.PINBOARD_UPDATE_REQUEST_START]: (state, action) => ({
    ...state,
    saving: true,
  }),
  [constants.UPDATE_PINBOARD_INFO_STATE]: (state, action) => {
    return {
      ...state,
      [action.payload.attr]: action.payload.value,
    };
  },
  [constants.ADD_ITEM_TO_PINBOARD_STATE]: (state, action) => {
    const attr = constants.PINBOARD_ATTR_MAP[action.payload.type];
    const ids = state[attr] || [];
    const format = getFormatId(attr);
    const newId = format(action.payload.id);
    return {
      ...state,
      [attr]: _.includes(ids, newId) ? ids : ids.concat(newId),
      needRefreshData: true,
    };
  },
  [constants.REMOVE_ITEM_FROM_PINBOARD_STATE]: (state, action) => {
    const { type, mode, id: payloadId } = action.payload;
    const attr = constants.PINBOARD_ATTR_MAP[type];
    let ids = state[attr] || [];
    const format = getFormatId(attr);

    return {
      ...state,
      [attr]: _.reject(ids, id => id === format(payloadId)),
      needRefreshData: mode !== constants.PINBOARD_ITEM_REMOVE_MODE.STATE_ONLY,
    };
  },
  [constants.ORDER_PINBOARD_STATE]: (state, action) => {
    const { ids, type } = action.payload;
    const attr = constants.PINBOARD_ATTR_MAP[type];
    const format = getFormatId(attr);

    return {
      ...state,
      [attr]: _.map(ids, format),
    };
  },
  [constants.PERFORM_FETCH_PINBOARD_RELATED_DATA]: (state, action) => {
    return {
      ...state,
      needRefreshData: false,
    };
  },
}, defaultState);
