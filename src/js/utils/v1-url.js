import config from 'config';


export const dataToolSearchUrl = (term='') => (`${config.v1Url}/s/${term}`);

const v1SessionUrl = (param, val) => (
  `${config.v1Url}/url-mediator/session-builder?${param}=${val}`
);

export const communityUrl = (name) => v1SessionUrl('community', global.encodeURI(name));

export const categoryUrl = (name) => v1SessionUrl('cat__category', global.encodeURI(name));
