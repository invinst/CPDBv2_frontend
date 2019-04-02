import { combineReducers } from 'redux';

import graphData from './graph-data';
import relevantDocuments from './relevant-documents';
import relevantCoaccusals from './relevant-coaccusals';
import relevantComplaints from './relevant-complaints';


export default combineReducers({
  graphData,
  relevantDocuments,
  relevantCoaccusals,
  relevantComplaints,
});
