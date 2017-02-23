import { handleActions } from 'redux-actions';

import { FAQS_REQUEST_START } from 'utils/constants';


const faqsRequested = handleActions({
  [FAQS_REQUEST_START]: (state, action) => (true)
}, false);

export default faqsRequested;
