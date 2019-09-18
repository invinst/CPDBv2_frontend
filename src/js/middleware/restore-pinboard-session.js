import { isPinboardRestoredSelector } from 'selectors/pinboard-page/pinboard';
import { fetchLatestRetrievedPinboard } from 'actions/pinboard';


export default store => next => action => {
  const result = next(action);

  if (action.type === '@@router/LOCATION_CHANGE') {
    const state = store.getState();
    if (!isPinboardRestoredSelector(state)) {
      store.dispatch(fetchLatestRetrievedPinboard({ create: action.payload.pathname === '/pinboard/' }));
    }
  }

  return result;
};
