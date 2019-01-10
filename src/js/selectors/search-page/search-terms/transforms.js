import { get, kebabCase } from 'lodash';

import { CALL_TO_ACTION_TYPES } from 'utils/constants';


export const navigationItemTransform = item => {
  const id = get(item, 'id', '');
  let to = '';
  let url = '';
  const callToActionType = get(item, 'call_to_action_type', '');

  if (callToActionType === CALL_TO_ACTION_TYPES.VIEW_ALL) {
    to = `/search/?terms=${id}&type=${id.toUpperCase()}`;
    url = '';
  } else if (callToActionType === CALL_TO_ACTION_TYPES.LINK) {
    to = '';
    url = get(item, 'link', '');
  }

  return {
    id,
    name: get(item, 'name', ''),
    description: get(item, 'description', ''),
    callToActionType,
    to,
    url,
    type: get(item, 'type', ''),
    uniqueKey: get(item, 'uniqueKey', `${item.type}-${kebabCase(item.id)}`),
  };
};
