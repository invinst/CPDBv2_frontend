import { combineReducers } from 'redux';

import shareableHeader from './shareable-header';
import slimHeader from './slim-header';


export default combineReducers({
  shareableHeader,
  slimHeader,
});
