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
        faqSection: {
          faqs: [],
          fields: {},
          editModeOn: false
        },
        reportSection: {
          fields: {},
          editModeOn: false,
          reports: []
        },
        heroSection: {
          editModeOn: false,
          fields: {}
        },
        vftgSection: {
          fields: {},
          editModeOn: false
        },
        aboutSection: {
          fields: {},
          editModeOn: false
        },
        collaborateSection: {
          fields: {},
          editModeOn: false
        },
        isRequesting: false
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
        isRequesting: false,
        suggestionGroups: {},
        contentType: null,
        recentSuggestions: [],
        tags: []
      },
      crPage: {
        isRequesting: false
      },
      crs: {},
      officerPage: {
        complaintFacets: [],
        complaintsCount: 0,
        fullName: '',
        isRequesting: false,
        summary: {},
        sustainedCount: 0
      }
    });
  });
});
