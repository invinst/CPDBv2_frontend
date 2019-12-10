import { handleActions } from 'redux-actions';

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    const { pathname } = action.payload;
    if (pathname.startsWith('/pinboard/'))
      return pathname;
    else if (!pathname.startsWith('/search/')) {
      return '/';
    }
    return state;
  },
}, '/');
