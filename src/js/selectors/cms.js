import { get } from 'lodash';

import { LANDING_PAGE_ID } from 'utils/constants';


export const getCMSFields = pageid => state => get(state.cms.pages[pageid], 'fields', null);
export const hasLoadingPageContent = state => state.cms.pages[LANDING_PAGE_ID] !== undefined;
