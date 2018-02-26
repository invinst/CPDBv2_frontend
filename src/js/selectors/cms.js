import { get } from 'lodash';


export const getCMSFields = pageid => state => get(state.cms.pages[pageid], 'fields', null);
