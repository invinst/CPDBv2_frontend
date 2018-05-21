import {
  OFFICER_SOCIAL_GRAPH_SUFFIX,
  OPEN_COMPLAINT_PAGE,
  OPEN_OFFICER_PAGE,
  OPEN_OFFICER_SOCIAL_GRAPH_PAGE,
  OPEN_POLICE_UNIT_PAGE
} from 'utils/constants';
import { pushPathPreserveEditMode } from 'utils/edit-path';


export default store => next => action => {
  if (action.type === OPEN_OFFICER_PAGE) {
    pushPathPreserveEditMode(`/officer/${action.payload}/`);
  }

  if (action.type === OPEN_OFFICER_SOCIAL_GRAPH_PAGE) {
    pushPathPreserveEditMode(`/officer/${action.payload}/${OFFICER_SOCIAL_GRAPH_SUFFIX}`);
  }

  if (action.type === OPEN_COMPLAINT_PAGE) {
    pushPathPreserveEditMode(`/complaint/${action.payload.crid}/`);
  }

  if (action.type === OPEN_POLICE_UNIT_PAGE) {
    pushPathPreserveEditMode(`/unit/${action.payload}/`);
  }
  return next(action);
};
