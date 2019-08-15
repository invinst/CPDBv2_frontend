import { PINBOARD_EDIT_MODE, PINBOARD_EDIT_TYPES, } from 'utils/constants';
import { handleCMSEditModeActions } from 'reducers/cms/utils';

export default handleCMSEditModeActions(PINBOARD_EDIT_MODE, PINBOARD_EDIT_TYPES);
