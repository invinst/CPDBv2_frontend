import config from 'config';


export const dataToolSearchUrl = (term='') => (`${config.v1Url}/s/${term}`);
export const neighborhoodUrl = (name) => (
  `${config.v1Url}/url-mediator/session-builder?neighborhood=${global.encodeURI(name)}`
);
