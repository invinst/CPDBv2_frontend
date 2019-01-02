import { get } from 'lodash';


export const getCMSFields = pageId => state => get(state, `cms.pages.${pageId}.fields`, null);
export const hasCMSContent = pageId => state => get(state, `cms.pages.${pageId}`, undefined) !== undefined;
