import { isEmpty } from 'lodash';

export const imageStyle = (imageUrl) => (
  isEmpty(imageUrl) ? {} : { backgroundImage: `url(${imageUrl})` }
);
