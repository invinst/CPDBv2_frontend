import { createAction } from 'redux-actions';
import {
  OPEN_COMPLAINT_PAGE,
  OPEN_POLICE_UNIT_PAGE,
  OPEN_TRR_PAGE,
} from 'utils/constants';


export const openComplaintPage = createAction(OPEN_COMPLAINT_PAGE);
export const openTRRPage = createAction(OPEN_TRR_PAGE);
export const openPoliceUnitPage = createAction(OPEN_POLICE_UNIT_PAGE);
