import config from 'config';


export const dataToolSearchUrl = (term='') => (`${config.v1Url}/s/${term}`);
