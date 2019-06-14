import { get } from 'lodash';

export const shouldRedirect = state => get(state, 'pinboardPage.redirect', false);
