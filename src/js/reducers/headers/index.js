import { combineReducers } from 'redux';

import shareableHeader from './shareable-header';
import slimHeader from './slim-header';
import pinboards from './pinboards';


export default combineReducers({
  shareableHeader,
  slimHeader,
  pinboards,
});
