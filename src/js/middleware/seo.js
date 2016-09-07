import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';
import { changePageTitle, changePageDescription } from 'utils/dom';


export default store => next => action => {
  if (action.type === LANDING_PAGE_REQUEST_SUCCESS) {
    changePageTitle(action.payload['page_title']);
    changePageDescription(action.payload['description']);
  }
  return next(action);
};
