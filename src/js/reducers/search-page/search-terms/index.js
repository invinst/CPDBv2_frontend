import { combineReducers } from 'redux';

import hidden from './hidden';
import categories from './categories';
import navigation from './navigation';


const searchTerms = combineReducers({
  hidden,
  categories,
  navigation,
});

export default searchTerms;
