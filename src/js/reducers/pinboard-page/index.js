import { combineReducers } from 'redux';

import graphData from './graph-data';
import geographicData from './geographic-data';
import currentTab from './current-tab';
import relevantDocuments from './relevant-documents';
import relevantCoaccusals from './relevant-coaccusals';
import relevantComplaints from './relevant-complaints';
import redirection from './redirection';


export default combineReducers({
  graphData,
  geographicData,
  currentTab,
  relevantDocuments,
  relevantCoaccusals,
  relevantComplaints,
  redirection,
});
