import { parse } from 'query-string';


export default url => {
  if (!url || url.split('?').length < 2) {
    return null;
  }

  const searchString = url.split('?')[1];
  return { ...parse(searchString) };
};
