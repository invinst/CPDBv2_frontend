import URL from 'url-parse';
import { takeRight, isEmpty } from 'lodash';

export const getDomainName = url => {
  if (isEmpty(url))
    return '';

  const parsedUrl = URL(url);
  return takeRight(parsedUrl.hostname.split('.'), 2).join('.');
};
