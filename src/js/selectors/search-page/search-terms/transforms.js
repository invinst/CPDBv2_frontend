import { get } from 'lodash';


export const navigationItemTransform = item => {
  const id = get(item, 'id', '');
  return {
    id,
    name: get(item, 'name', ''),
    description: get(item, 'description', ''),
    'call_to_action_type': get(item, 'call_to_action_type', ''),
    link: get(item, 'link', ''),
    type: get(item, 'type', ''),
    uniqueKey: get(item, 'uniqueKey', `${item.type}-${item.id}`),
    to: `/search/?terms=${id}&type=${id.toUpperCase()}`,
  };
};
