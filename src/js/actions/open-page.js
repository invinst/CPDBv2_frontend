import { createAction } from 'redux-actions';
import {
  OPEN_POLICE_UNIT_PAGE,
  OPEN_TRR_PAGE,
} from 'utils/constants';


export const openTRRPage = createAction(OPEN_TRR_PAGE);
export const openPoliceUnitPage = createAction(OPEN_POLICE_UNIT_PAGE);
