import { OFFICER_EDIT_MODE, OFFICER_EDIT_TYPES } from 'utils/constants';
import { handleCMSEditModeActions } from 'reducers/cms/utils';

export default handleCMSEditModeActions(OFFICER_EDIT_MODE, OFFICER_EDIT_TYPES);
