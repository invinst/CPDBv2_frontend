import { createAction } from 'redux-actions';


export const CREATE_LINK_ENTITY = 'CREATE_LINK_ENTITY';
export const REMOVE_LINK_ENTITY = 'REMOVE_LINK_ENTITY';
export const OPEN_RICH_TEXT_TOOLBAR = 'OPEN_RICH_TEXT_TOOLBAR';
export const CLOSE_RICH_TEXT_TOOLBAR = 'CLOSE_RICH_TEXT_TOOLBAR';

export const createLinkEntity = createAction(CREATE_LINK_ENTITY);
export const removeLinkEntity = createAction(REMOVE_LINK_ENTITY);
export const openRichTextToolbar = createAction(OPEN_RICH_TEXT_TOOLBAR);
export const closeRichTextToolbar = createAction(CLOSE_RICH_TEXT_TOOLBAR);
