import { getOfficerId } from 'selectors/officer-page';
import { pinboardsMenuSelector } from 'selectors/common/pinboards';
import { PINNED_ITEM_TYPES } from 'utils/constants';

export const officerPinboardsMenuSelector = pinboardsMenuSelector(getOfficerId, PINNED_ITEM_TYPES.OFFICER);
