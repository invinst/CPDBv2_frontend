import { kebabCase, isEmpty, isNil } from 'lodash';


export const generatePinboardUrl = pinboard => {
  if (pinboard === null || isNil(pinboard['id'])) {
    return '';
  }

  const title = isEmpty(pinboard['title']) ? 'Untitled Pinboard' : pinboard['title'];
  return `/pinboard/${pinboard.id}/${kebabCase(title)}/`;
};
