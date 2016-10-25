import { handleActions } from 'redux-actions';
import { find, map } from 'lodash';

import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => (map(
    find(action.payload.fields, ({ name }) => (name==='reports')).value,
    'id'
    ))
}, []);

export default fields;
