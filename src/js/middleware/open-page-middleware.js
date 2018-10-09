import {
  OPEN_POLICE_UNIT_PAGE,
  OPEN_TRR_PAGE,
} from 'utils/constants';
import { pushPathPreserveEditMode } from 'utils/edit-path';


export default store => next => action => {
  if (action.type === OPEN_TRR_PAGE) {
    pushPathPreserveEditMode(`/trr/${action.payload.trrId}/`);
  }

  if (action.type === OPEN_POLICE_UNIT_PAGE) {
    pushPathPreserveEditMode(`/unit/${action.payload}/`);
  }
  return next(action);
};
