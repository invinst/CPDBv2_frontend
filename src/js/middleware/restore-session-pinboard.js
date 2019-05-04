import { getPinboard } from 'selectors/pinboard';
import { fetchLatestRetrievedPinboard } from 'actions/pinboard';


export default store => next => action => {
  const state = store.getState();
  const pinboard = getPinboard(state);

  if (action.type === '@@router/LOCATION_CHANGE' &&
    !action.payload.pathname.match(/\/pinboard\/[a-fA-F0-9]+\//) &&
    !pinboard.isPinboardRestored) {
    store.dispatch(fetchLatestRetrievedPinboard());
  }

  return next(action);
};
