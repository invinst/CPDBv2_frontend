import { kebabCase } from 'lodash';


export const officerPath = (officerId, name = '') => {
  const nameSuffix = name && `${kebabCase(name)}/`;
  return officerId && `/officer/${officerId}/${nameSuffix}`;
};

/**
 * Return the same key for some paths identify the same page
 *
 *  - Officer paths such as /officer/123/ and /officer/123/social/ should give the same key
 *  - Pinboard paths such as /pinboard//268a5e58/old-name/ and /pinboard//268a5e58/new-name/ should give the same key
 *  - Search paths such as /search/ and /search/alias/ should always give the same key
 */
export const getPathNameKey = (pathname) => {
  let pathnameKey = pathname.replace(/^\/edit(.*)/, '$1');

  const patterns = [
    /\/officer\/\d+\//,
    /\/pinboard\/[A-Za-z0-9]+\//,
    /\/search\//,
  ];
  for (let ind in patterns) {
    const pattern = patterns[ind];
    if (pathname.match(pattern)) {
      pathnameKey = pathnameKey.match(pattern)[0];
    }
  }
  return pathnameKey;
};
