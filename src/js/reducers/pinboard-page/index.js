import { combineReducers } from 'redux';

import graphData from './graph-data';
import relevantCoaccusals from './relevant-coaccusals';


export default combineReducers({
  graphData,
  relevantCoaccusals,
});
