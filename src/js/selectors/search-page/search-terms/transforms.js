import { get } from 'lodash';


export const navigationItemTransform = item => {
  if (item === undefined) {
    return {};
  }
  return {
    id: get(item, 'id', ''),
    name: get(item, 'name', ''),
    description: get(item, 'description', ''),
    callToActionType: get(item, 'call_to_action_type', ''),
    link: get(item, 'link', ''),
    type: get(item, 'type', ''),
    uniqueKey: get(item, 'uniqueKey', `${item.type}-${item.id}`),
  };
};
