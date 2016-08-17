import configureStore from 'store';
import { PAGINATION_DEFAULT } from 'utils/constants';


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
      landingPage: {
        storyApp: {
          stories: PAGINATION_DEFAULT,
          isRequesting: false,
          featuredStoryId: 0
        },
        bottomSheet: {
          content: null
        },
        faqApp: {
          faqs: PAGINATION_DEFAULT,
          isRequesting: false
        }
      },
      faqPage: {
        faqForm: {
          isSubmitting: false
        },
        faqs: PAGINATION_DEFAULT,
        isRequesting: false
      },
      storiesPage: {
        featuredStories: {
          isRequesting: false,
          stories: PAGINATION_DEFAULT
        },
        nonFeaturedStories: {
          isLoadingMore: false,
          isRequesting: false,
          stories: PAGINATION_DEFAULT
        }
      }
    });
  });
});
