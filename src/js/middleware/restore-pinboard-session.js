import { isPinboardRestoredSelector } from 'selectors/pinboard-page/pinboard';
import { fetchLatestRetrievedPinboard } from 'actions/pinboard';


export default store => next => action => {
  const result = next(action);

  if (action.type === '@@router/LOCATION_CHANGE') {
    const state = store.getState();
    if (!isPinboardRestoredSelector(state) && !action.payload.pathname.match(/\/pinboard\/[a-fA-F0-9]+\//)) {
      store.dispatch(fetchLatestRetrievedPinboard({ create: action.payload.pathname === '/pinboard/' }));
    }
  }

  return result;
};
