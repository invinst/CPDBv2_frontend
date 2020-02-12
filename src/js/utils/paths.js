import { kebabCase } from 'lodash';


export const officerPath = (officerId, name = '') => {
  const nameSuffix = name && `${kebabCase(name)}/`;
  return officerId && `/officer/${officerId}/${nameSuffix}`;
};
