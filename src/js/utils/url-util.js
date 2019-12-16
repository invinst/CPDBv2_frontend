import { kebabCase } from 'lodash';


export const officerUrl = (officerId, name = '') => {
  const nameSuffix = name && `${kebabCase(name)}/`;
  return officerId && `/officer/${officerId}/${nameSuffix}`;
};
