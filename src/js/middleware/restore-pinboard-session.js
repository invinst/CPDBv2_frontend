import { getPinboard } from 'selectors/pinboard-page/pinboard';
import { fetchLatestRetrievedPinboard } from 'actions/pinboard';


export default store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE' &&
    !action.payload.pathname.match(/\/pinboard\/[a-fA-F0-9]+\//)) {
    const state = store.getState();
    const pinboard = getPinboard(state);
    if (!pinboard.isPinboardRestored) {
      store.dispatch(fetchLatestRetrievedPinboard());
    }
  }

  return next(action);
};
