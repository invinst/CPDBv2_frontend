import { createAction } from 'redux-actions';
import {
  OPEN_COMPLAINT_PAGE,
  OPEN_OFFICER_PAGE,
  OPEN_OFFICER_SOCIAL_GRAPH_PAGE,
  OPEN_POLICE_UNIT_PAGE
} from 'utils/constants';


export const openComplaintPage = createAction(OPEN_COMPLAINT_PAGE);
export const openPoliceUnitPage = createAction(OPEN_POLICE_UNIT_PAGE);
export const openOfficerPage = createAction(OPEN_OFFICER_PAGE);
export const openOfficerSocialGraphPage = createAction(OPEN_OFFICER_SOCIAL_GRAPH_PAGE);
