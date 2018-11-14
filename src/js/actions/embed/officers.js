import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const requestEmbedOfficers = (ids) => get(
  constants.OFFICER_URL,
  [
    constants.EMBED_OFFICERS_REQUEST_START,
    constants.EMBED_OFFICERS_REQUEST_SUCCESS,
    constants.EMBED_OFFICERS_REQUEST_FAILURE
  ]
)({ ids });
