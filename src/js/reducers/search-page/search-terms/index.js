import { combineReducers } from 'redux';

import hidden from './hidden';
import categories from './categories';


const searchTerms = combineReducers({
  hidden,
  categories
});

export default searchTerms;
