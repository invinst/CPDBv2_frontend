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
          isRequesting: false,
          headerEditModeOn: false
        },
        officersByAllegation: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false
        },
        recentDocument: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false
        },
        complaintSummaries: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false
        },
        heatMap: {
          citySummary: {},
          communities: null
        }
      },
      faqPage: {
        isRequesting: false,
        faqsRequested: false
      },
      authentication: {
        loginErrorMessage: null,
        loginSuccessMessage: null,
        forgotPasswordErrorMessage: null,
        apiAccessToken: null,
        showForgotPasswordModal: false
      },
      appContent: null,
      cms: {
        pages: {}
      },
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
        navigation: { 'itemIndex': 0 },
        isRequesting: false,
        suggestionGroups: {
          meta: {}
        },
        pagination: {},
        contentType: null,
        recentSuggestions: [],
        tags: [],
        query: '',
        searchTerms: {
          categories: [],
          hidden: true,
          navigation: {
            itemIndex: 0,
            scrollTo: true,
          }
        }
      },
      inlineAliasAdminPage: {},
      crPage: {
        isRequesting: false,
        crid: null,
        officerId: null,
        attachmentRequest: {
          request: {
            isRequested: false,
            message: ''
          },
          subscribedCRIDs: {}
        }
      },
      crs: {},
      officerPage: {
        activeTab: null,
        fullName: '',
        breadcrumbCachedFullName: '',
        isRequesting: false,
        officerId: null,
        pathname: null,
        summary: {},
        socialGraph: {
          isRequesting: false,
          links: [],
          nodes: [],
          yearRange: [
            2000,
            2017
          ]
        },
        newTimeline: {
          filter: 'ALL EVENTS',
          isRequesting: false,
          items: []
        }
      },
      unitProfilePage: {
        isRequesting: false,
        summary: {}
      },
      genericModal: {
        activeModal: null
      },
      breadcrumb: {
        breadcrumbs: []
      },
      headers: {
        shareableHeader: {
          scrollPosition: null
        },
        slimHeader: {
          logoSectionEditModeOn: false
        }
      }
    });
  });
});
