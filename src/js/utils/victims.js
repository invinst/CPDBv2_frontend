import { compact } from 'lodash';


export const getDemographicString = ({ race, gender, age }) =>
  compact([race, gender, age ? `Age ${ age }` : null]).join(', ');
