import { handleActions } from 'redux-actions';
import { find, map } from 'lodash';

import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';


const faqs = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => (map(
    find(action.payload.fields, ({ name }) => (name==='faqs')).value,
    'id'
    ))
}, []);

export default faqs;
