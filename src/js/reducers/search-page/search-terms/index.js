import { combineReducers } from 'redux';

import hidden from './hidden';
import categories from './categories';
import selectedCategory from './selected-category';


const searchTerms = combineReducers({
  hidden,
  selectedCategory,
  categories
});

export default searchTerms;
