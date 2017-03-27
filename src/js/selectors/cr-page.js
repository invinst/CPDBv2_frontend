import { createSelector } from 'reselect';
import { map } from 'lodash';


const getCoaccused = (state, { crid }) => !state.crs[crid] ? [] : state.crs[crid].coaccused;
export const getComplainants = (state, { crid }) => !state.crs[crid] ? [] : state.crs[crid].complainants;

const coaccusedToCamelCase = coaccused => {
  return {
    id: coaccused.id,
    fullName: coaccused['full_name'],
    gender: coaccused['gender'] || 'Unknown',
    race: coaccused['race'] || 'Unknown',
    finalFinding: coaccused['final_finding'] || 'Unknown',
    reccOutcome: coaccused['recc_outcome'] || 'Unknown',
    finalOutcome: coaccused['final_outcome'] || 'Unknown',
    startDate: coaccused['start_date'],
    endDate: coaccused['end_date'],
    category: coaccused['category'] || 'Unknown',
    subcategory: coaccused['subcategory'] || 'Unknown'
  };
};

const getComplainantStringSelector = createSelector(
  getComplainants,
  (complainants) => map(complainants, ({ race, gender, age }) => {
    race = race ? race : 'Unknown';
    gender = gender ? gender : 'Unknown';

    return `${race}, ${gender}, Age ${age}`;
  })
);

const getCoaccusedSelector = createSelector(
  getCoaccused,
  coaccusedList => map(coaccusedList, obj => coaccusedToCamelCase(obj))
);

export const contentSelector = createSelector(
  getCoaccusedSelector,
  getComplainantStringSelector,
  (coaccused, complainants) => ({ coaccused, complainants })
);
