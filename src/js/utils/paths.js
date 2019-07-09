import { kebabCase } from 'lodash';

export const officerPath = (officer) => (
  `/officer/${officer.id}/${kebabCase(officer['full_name'])}/`
);
