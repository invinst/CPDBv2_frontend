import { snakeCase, toUpper } from 'lodash';


const DATA_VISUALIZATION_URL_REGEX = /^\/(social-graph|geographic)\/?/;

export const getDataVisualizationTabName = (pathname) => {
  const matches = DATA_VISUALIZATION_URL_REGEX.exec(pathname) || [];
  return toUpper(snakeCase(matches[1]));
};
