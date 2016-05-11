import { List } from 'immutable';

import configureStore from 'store';
import { selectStory } from 'actions/story-app';


function setUp() {
  const store = configureStore(undefined);
  let currentState;

  const observer = () => {
    currentState = store.getState();
  };

  function getCurrentState() {
    return currentState;
  }

  let unsubscribe = store.subscribe(observer);
  observer();

  return {
    store,
    getCurrentState,
    unsubscribe
  };
}

describe('store', function () {
  it('should have initial state', function () {
    const { getCurrentState } = setUp();
    getCurrentState().should.eql({
      selectedStory: 0,
      stories: List([]),
      isRequesting: false
    });
  });

  it('should dispatch action', function () {
    const { store, getCurrentState } = setUp();

    store.dispatch(selectStory(1));
    getCurrentState().should.eql({
      selectedStory: 1,
      stories: List([]),
      isRequesting: false
    });
  });
});
