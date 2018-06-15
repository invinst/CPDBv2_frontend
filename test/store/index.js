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
          communities: null,
          clusterGeoJson: null
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
      cms: {
        pages: {}
      },
      pageLoading: false,
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
            itemIndex: 0
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
        },
        relatedComplaints: {
          relatedByCategory: {
            count: 0,
            pagination: {
              next: null,
              previous: null
            },
            cards: {
              meta: {
                crPageCrid: null,
                distance: null
              },
              cards: []
            }
          },
          relatedByOfficer: {
            count: 0,
            pagination: {
              next: null,
              previous: null
            },
            cards: {
              meta: {
                crPageCrid: null,
                distance: null
              },
              cards: []
            }
          }
        }
      },
      trrPage: {
        trrId: null,
        data: {},
        isRequesting: false,
      },
      crs: {},
      officerPage: {
        activeTab: null,
        currentTab: 'TIMELINE',
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
        },
        coaccusals: {
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
      breadcrumbsMapping: {},
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
