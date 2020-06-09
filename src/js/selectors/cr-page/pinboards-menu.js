import { getCRID } from 'selectors/cr-page';
import { pinboardsMenuSelector } from 'selectors/common/pinboards';
import { PINNED_ITEM_TYPES } from 'utils/constants';

export const crPinboardsMenuSelector = pinboardsMenuSelector(getCRID, PINNED_ITEM_TYPES.CR);
