import config from 'config';


export const dataToolSearchUrl = (term='') => (`${config.v1Url}/s/${term}`);
export const communityUrl = (name) => (
  `${config.v1Url}/url-mediator/session-builder?community=${global.encodeURI(name)}`
);
