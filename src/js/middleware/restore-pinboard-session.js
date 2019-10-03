import { isPinboardRestoredSelector } from 'selectors/pinboard-page/pinboard';
import { fetchLatestRetrievedPinboard } from 'actions/pinboard';
import { isEmpty } from 'lodash';


export default store => next => action => {
  const result = next(action);

  if (action.type === '@@router/LOCATION_CHANGE') {
    const state = store.getState();
    if (
      !isPinboardRestoredSelector(state)
      && !action.payload.pathname.match(/\/pinboard\/[a-fA-F0-9]+\//)
      && (isEmpty(action.payload.query) || !action.payload.pathname.match(/\/pinboard\//))
    ) {
      store.dispatch(fetchLatestRetrievedPinboard({ create: action.payload.pathname === '/pinboard/' }));
    }
  }

  return result;
};
