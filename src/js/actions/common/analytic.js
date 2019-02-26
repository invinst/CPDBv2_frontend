import { post } from 'actions/common/async-action';
import {
  V2_ROOT_PATH,
  TRACKING_CLICK_ATTACHMENT_START,
  TRACKING_CLICK_ATTACHMENT_SUCCESS,
  TRACKING_CLICK_ATTACHMENT_FAILURE,
} from 'utils/constants';


export const trackingClickAttachment = ({ attachmentId, sourcePage, app }) => post(
  `${V2_ROOT_PATH}attachment-tracking/`,
  [TRACKING_CLICK_ATTACHMENT_START, TRACKING_CLICK_ATTACHMENT_SUCCESS, TRACKING_CLICK_ATTACHMENT_FAILURE]
)({ 'accessed_from_page': sourcePage, 'app': app, 'attachment_id': attachmentId });
