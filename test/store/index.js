import configureStore from 'store';


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
        activityGrid: {
          cards: [],
          isRequesting: false
        },
      },
      faqPage: {
        isRequesting: false,
        faqsRequested: false,
        faqForm: {
          isSubmitting: false
        }
      },
      authentication: {
        loginErrorMessage: null,
        loginSuccessMessage: null,
        forgotPasswordErrorMessage: null,
        apiAccessToken: null,
        showForgotPasswordModal: false
      },
      appContent: null,
      reportingPage: {
        isRequesting: false,
        reportGrouping: {
          groups: [],
          groupingStrategy: 'STRATEGY_RANDOM',
          existingReportIds: []
        },
        pagination: {
          next: null,
          previous: null,
          count: 0
        }
      },
      bottomSheet: {
        officersAutoSuggest: {
          isRequesting: false,
          officers: []
        }
      },
      reports: {},
      faqs: {},
      routing: {
        locationBeforeTransitions: null
      },
      searchPage: {
        navigation: { 'columnIndex': 0, 'itemIndex': 0 },
        isRequesting: false,
        suggestionGroups: {},
        contentType: null,
        recentSuggestions: [],
        tags: [],
        query: '',
        itemsPerColumn: 10
      },
      inlineAliasAdminPage: {},
      crPage: {
        isRequesting: false
      },
      crs: {},
      officerPage: {
        complaintFacets: [],
        complaintsCount: 0,
        fullName: '',
        isRequesting: false,
        officerId: null,
        summary: {},
        sustainedCount: 0,
        socialGraph: {
          isRequesting: false,
          links: [],
          nodes: [],
          yearRange: [
            1984,
            2017
          ]
        },
        timeline: {
          hoveredItemIndex: null,
          isRequesting: false,
          items: [],
          minimap: {
            isRequesting: false,
            minimap: []
          },
          pagination: {
            next: null,
            previous: null
          },
          selectedItemIndex: null,
          sortDescending: true
        }
      },
      unitProfilePage: {
        isRequesting: false,
        summary: {}
      }
    });
  });
});
