import { Promise } from 'es6-promise';
import { stub, useFakeTimers } from 'sinon';
import * as _ from 'lodash';
import { CancelToken } from 'axios';
import Cookies from 'js-cookie';
import { LOCATION_CHANGE } from 'connected-react-router';

import fetchPageInitialData from 'middleware/fetch-page-initial-data';
import { changeOfficerId, fetchOfficerSummary, requestCreateOfficerZipFile } from 'actions/officer-page';
import {
  LANDING_PAGE_ID,
  OFFICER_PAGE_ID,
  CR_PAGE_ID,
  TRR_PAGE_ID,
  SIGNIN_REQUEST_SUCCESS,
  PINBOARD_PAGE_ID,
} from 'utils/constants';
import { fetchNewTimelineItems } from 'actions/officer-page/new-timeline';
import { fetchPage } from 'actions/cms';
import { getCommunities, getClusterGeoJson } from 'actions/landing-page/heat-map';
import { getCitySummary } from 'actions/landing-page/city-summary';
import { requestOfficersByAllegation } from 'actions/landing-page/officers-by-allegation';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import { getRecentDocument } from 'actions/landing-page/recent-document';
import { getComplaintSummaries } from 'actions/landing-page/complaint-summaries';
import { fetchCR } from 'actions/cr-page';
import { fetchTRR } from 'actions/trr-page';
import { fetchUnitProfileSummary } from 'actions/unit-profile-page';
import { pageLoadFinish, pageLoadStart } from 'actions/page-loading';
import { fetchPopup } from 'actions/popup';
import { requestSearchTermCategories } from 'actions/search-page/search-terms';
import { fetchDocumentsByCRID } from 'actions/document-deduplicator-page';
import * as docOverviewPageActions from 'actions/documents-overview-page';
import { requestCrawlers } from 'actions/crawlers-page';
import { fetchDocument, fetchDocumentSuggestionTags } from 'actions/document-page';
import {
  fetchPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
} from 'actions/pinboard';
import { fetchVideoInfo } from 'actions/headers/slim-header';
import * as pinboardAdminAction from 'actions/pinboard-admin-page';
import { fetchToast } from 'actions/toast';
import * as appConfigActions from 'actions/app-config';
import * as appConfig from 'utils/app-config';


const createLocationChangeAction = (pathname) => ({
  type: LOCATION_CHANGE,
  payload: {
    location: {
      pathname,
      search: pathname.split('?')[1],
    },
  },
});

const createSignInRequestSuccessAction = () => ({
  type: SIGNIN_REQUEST_SUCCESS,
  payload: {},
});

const buildStore = () => ({
  _state: {
    cms: {
      pages: {},
    },
    landingPage: {
      heatMap: {
        communities: null,
        citySummary: {},
        clusterGeoJson: null,
      },
      officersByAllegation: {
        cards: [],
      },
      recentDocument: {
        cards: [],
      },
      complaintSummaries: {
        cards: [],
      },
      activityGrid: {
        cards: [],
      },
    },
    searchPage: {
      searchTerms: {
        categories: [],
      },
    },
    faqPage: {
      faqsRequested: false,
    },
    documentDeduplicatorPage: {
      documents: {
        data: {},
        crid: '',
      },
      pagination: {},
      documentsOrder: {
        data: [],
        crid: '',
      },
    },
    documentsOverviewPage: {
      documents: {
        data: {},
        match: '',
      },
      pagination: {},
      documentsOrder: {
        data: [],
        match: '',
      },
    },
    pinboardPage: {
      pinboard: null,
    },
    toasts: [],
  },
  getState() {
    return this._state;
  },
  dispatch: stub().usingPromise(Promise).resolves('abc'),
});

describe('fetchPageInitialData middleware', function () {
  const store = buildStore();

  beforeEach(function () {
    const action = createLocationChangeAction('');
    fetchPageInitialData(store)(action => action)(action);
    store.dispatch.resetHistory();
  });

  it('should not dispatch any action if action is not LOCATION_CHANGE', function () {
    const action = {
      type: 'other action',
    };
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.called.should.be.false();
  });

  it('should dispatch officer cms fetchPage action if officer page and cms is empty', function () {
    const action = createLocationChangeAction('/officer/1/');
    let dispatched;
    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.calledWith(fetchPage(OFFICER_PAGE_ID)()).should.be.true();
  });

  it('should not dispatch officer cms fetchPage action if officer page and cms is present', function () {
    const cmsStore = {
      getState() {
        return {
          cms: {
            pages: {
              'officer-page': {},
            },
          },
        };
      },
      dispatch: stub().usingPromise(Promise).resolves('abc'),
    };

    const action = createLocationChangeAction('/officer/2/');
    let dispatched;
    fetchPageInitialData(cmsStore)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    cmsStore.dispatch.calledWith(fetchPage(OFFICER_PAGE_ID)()).should.be.false();
  });

  it('should dispatch cr cms fetchPage action if cr page and cms is empty', function () {
    const action = createLocationChangeAction('/complaint/1/');
    let dispatched;
    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.calledWith(fetchPage(CR_PAGE_ID)()).should.be.true();
  });

  it('should dispatch trr cms fetchPage action if trr page and cms is empty', function () {
    const action = createLocationChangeAction('/trr/1/');
    let dispatched;
    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.calledWith(fetchPage(TRR_PAGE_ID)()).should.be.true();
  });

  it('should dispatch officer actions if officer id change', function () {
    const locationChangeAction = createLocationChangeAction('/officer/2/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(changeOfficerId(2)).should.be.true();
    store.dispatch.calledWith(fetchOfficerSummary(2)).should.be.true();
    store.dispatch.calledWith(fetchNewTimelineItems(2)).should.be.true();
    store.dispatch.calledWith(requestCreateOfficerZipFile(2)).should.be.true();
    store.dispatch.calledWith(fetchPopup('officer')).should.be.true();
  });

  it('should dispatch fetchTRR if trr id change', function () {
    const locationChangeAction = createLocationChangeAction('/trr/2/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(fetchTRR(2)).should.be.true();
    store.dispatch.calledWith(fetchPopup('trr')).should.be.true();
  });

  describe('should dispatch fetch data for landing page when they do not exist', function () {
    ['/', '/edit/', '/search/', '/edit/search/'].forEach(function (pathname) {
      it(`when moving to ${pathname}`, function () {
        const action = createLocationChangeAction(pathname);
        let dispatched;
        fetchPageInitialData(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);

        store.dispatch.calledWith(fetchPage(LANDING_PAGE_ID)()).should.be.true();
        store.dispatch.calledWith(getCommunities()).should.be.true();
        store.dispatch.calledWith(getCitySummary()).should.be.true();
        store.dispatch.calledWith(getClusterGeoJson()).should.be.true();
        store.dispatch.calledWith(requestOfficersByAllegation()).should.be.true();
        store.dispatch.calledWith(requestActivityGrid()).should.be.true();
        store.dispatch.calledWith(getRecentDocument()).should.be.true();
        store.dispatch.calledWith(getComplaintSummaries()).should.be.true();
        store.dispatch.calledWith(fetchVideoInfo()).should.be.true();
      });
    });
  });

  it('should dispatch fetch cr data if crid change', function () {
    const locationChangeAction = createLocationChangeAction('/complaint/2/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(fetchCR(2)).should.be.true();
    store.dispatch.calledWith(fetchPopup('complaint')).should.be.true();
  });

  it('should dispatch fetch unit data when location change to unit page', function () {
    const locationChangeAction = createLocationChangeAction('/unit/2/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(fetchUnitProfileSummary(2)).should.be.true();
  });

  it('should dispatch pageLoadStart and pageLoadFinish', function (done) {
    const locationChangeAction = createLocationChangeAction('/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(pageLoadStart()).should.be.true();
    setTimeout(() => {
      store.dispatch.calledWith(pageLoadFinish()).should.be.true();
      done();
    }, 100);
  });

  describe('fetch search page data', function () {
    ['/', '/edit/', '/search/', '/edit/search/'].forEach(function (pathname) {
      context(`when going to ${pathname}`, function () {
        it('should dispatch requestSearchTermCategories', function () {
          const action = createLocationChangeAction(pathname);
          let dispatched;

          fetchPageInitialData(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);
          store.dispatch.calledWith(requestSearchTermCategories()).should.be.true();
        });

        it('should not dispatch requestSearchTermCategories when has categories', function () {
          const store = buildStore();
          _.set(store._state, 'searchPage.searchTerms.categories', [{ name: 'Category Name' }]);
          let action = createLocationChangeAction(pathname);
          let dispatched;

          fetchPageInitialData(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);

          store.dispatch.calledWith(requestSearchTermCategories()).should.be.false();
        });
      });
    });
  });

  it('should dispatch fetchDocument when location changes', function () {
    const action = createLocationChangeAction('/document/1234/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchDocument(1234)).should.be.true();
  });

  context('fetch document data when location changes', function () {
    context('user is logged in', function () {
      it('should dispatch fetchDocument & fetchDocumentSuggestionTags', function () {
        stub(Cookies, 'get').withArgs('apiAccessToken').returns('apiAccessToken');
        const action = createLocationChangeAction('/document/1234/');
        let dispatched;

        fetchPageInitialData(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);
        store.dispatch.calledWith(fetchDocument(1234)).should.be.true();
        store.dispatch.calledWith(fetchDocumentSuggestionTags()).should.be.true();
      });
    });

    context('user is not logged in', function () {
      it('should only dispatch fetchDocument & not dispatch fetchDocumentSuggestionTags', function () {
        stub(Cookies, 'get').withArgs('apiAccessToken').returns(null);
        const action = createLocationChangeAction('/document/1234/');
        let dispatched;

        fetchPageInitialData(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);
        store.dispatch.calledWith(fetchDocument(1234)).should.be.true();
        store.dispatch.calledWith(fetchDocumentSuggestionTags()).should.be.false();
      });
    });
  });

  it('should dispatch fetchDocument when signing in successfully', function () {
    const store = buildStore();
    _.set(store._state, 'pathname', '/document/1234/');
    const action = createSignInRequestSuccessAction();
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchDocument(1234)).should.be.true();
  });

  it('should dispatch getCommunities, getClusterGeoJson and getCitySummary', function () {
    const action = createLocationChangeAction('/embed/map/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(getCommunities()).should.be.true();
    store.dispatch.calledWith(getClusterGeoJson()).should.be.true();
    store.dispatch.calledWith(getCitySummary()).should.be.true();
  });

  it('should dispatch fetch data for embedded top officers page when they do not exist', function () {
    const action = createLocationChangeAction('/embed/top-officers');
    let dispatched;
    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.calledWith(fetchPage(LANDING_PAGE_ID)()).should.be.true();
    store.dispatch.calledWith(requestOfficersByAllegation()).should.be.true();
  });

  it('should dispatch fetchDocumentsByCRID', function () {
    const action = createLocationChangeAction('/documents/crid/1000000/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchDocumentsByCRID({ crid: '1000000' })).should.be.true();
  });

  it('should not dispatch fetchDocumentsByCRID when crid hasnt changed', function () {
    const store = buildStore();
    _.set(store._state, 'documentDeduplicatorPage.documents.crid', '123');
    const action = createLocationChangeAction('/documents/crid/123/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchDocumentsByCRID({ crid: '123' })).should.be.false();
  });

  it('should dispatch fetchDocuments', function () {
    const action = createLocationChangeAction('/documents/');
    let dispatched;
    const fetchDocuments = stub(docOverviewPageActions, 'fetchDocuments');

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchDocuments()).should.be.true();
  });

  it('should dispatch fetchDocuments with match params page', function () {
    const action = createLocationChangeAction('/documents/?match=1000000');
    let dispatched;
    const fetchDocuments = stub(docOverviewPageActions, 'fetchDocuments');

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchDocuments({ match: '1000000' })).should.be.true();
  });

  it('should not dispatch fetchDocuments when match is not empty and hasnt changed ', function () {
    const store = buildStore();
    _.set(store._state, 'documentsOverviewPage.documents.match', '1000000');
    const action = createLocationChangeAction('/documents/?match=1000000');
    let dispatched;
    const fetchDocuments = stub(docOverviewPageActions, 'fetchDocuments');

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchDocuments({ match: '1000000' })).should.be.false();
  });

  it('should dispatch fetchDocumentsAuthenticated when signing in successfully', function () {
    const store = buildStore();
    _.set(store._state, 'pathname', '/documents/');
    const action = createSignInRequestSuccessAction();
    let dispatched;
    const fetchDocumentsAuthenticated = stub(docOverviewPageActions, 'fetchDocumentsAuthenticated');

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchDocumentsAuthenticated()).should.be.true();
  });

  it('should dispatch fetchDocumentsAuthenticated when accessing with edit mode', function () {
    const action = createLocationChangeAction('/edit/documents/');
    let dispatched;
    const fetchDocumentsAuthenticated = stub(docOverviewPageActions, 'fetchDocumentsAuthenticated');

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchDocumentsAuthenticated()).should.be.true();
  });

  it('should dispatch requestCrawlers', function () {
    const action = createLocationChangeAction('/crawlers/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(requestCrawlers()).should.be.true();
  });

  it('should get pinboard cms', function () {
    const store = buildStore();
    const action = createLocationChangeAction('/pinboard/268a5e58/');
    let dispatched;
    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.calledWith(fetchPage(PINBOARD_PAGE_ID)()).should.be.true();
  });

  context('pinboard page', function () {
    context('requesting pinboard does not equal ID in state', function () {
      it('should dispatch fetchPinboard', function () {
        stub(CancelToken, 'source');
        const store = buildStore();
        _.set(store._state, 'pinboardPage.pinboard.id', '268a5e58');
        const action = createLocationChangeAction('/pinboard/5cd06f2b/');
        let dispatched;

        fetchPageInitialData(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);
        store.dispatch.calledWith(fetchPinboard('5cd06f2b')).should.be.true();
      });
    });

    context('requesting pinboard equal ID in state', function () {
      context('hasPendingChanges is false', function () {
        it('should dispatch fetchPinboard', function () {
          stub(CancelToken, 'source');
          const store = buildStore();
          _.set(store._state, 'pinboardPage.pinboard.id', '268a5e58');
          _.set(store._state, 'pinboardPage.pinboard.hasPendingChanges', false);
          const action = createLocationChangeAction('/pinboard/268a5e58/');
          let dispatched;

          fetchPageInitialData(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);
          store.dispatch.calledWith(fetchPinboard('268a5e58')).should.be.true();
        });
      });

      context('hasPendingChanges is true', function () {
        it('should not dispatch fetchPinboard', function () {
          stub(CancelToken, 'source');
          const store = buildStore();
          _.set(store._state, 'pinboardPage.pinboard.id', '268a5e58');
          _.set(store._state, 'pinboardPage.pinboard.hasPendingChanges', true);
          const action = createLocationChangeAction('/pinboard/268a5e58/');
          let dispatched;

          fetchPageInitialData(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);
          store.dispatch.calledWith(fetchPinboard('268a5e58')).should.be.false();
        });
      });
    });
  });

  it('should not dispatch fetchPinboard if requesting ID is not valid', function () {
    const store = buildStore();
    _.set(store._state, 'pinboardPage.pinboard.id', null);
    const action = createLocationChangeAction('/pinboard/268a5e5/'); // Not enough 8 characters
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchPinboard('268a5e5')).should.be.false();
    store.dispatch.calledWith(fetchPinboardComplaints('268a5e5')).should.be.false();
    store.dispatch.calledWith(fetchPinboardOfficers('268a5e5')).should.be.false();
    store.dispatch.calledWith(fetchPinboardTRRs('268a5e5')).should.be.false();
    store.dispatch.should.not.be.calledWith(fetchPinboardSocialGraph('268a5e5'));
    store.dispatch.should.not.be.calledWith(fetchPinboardRelevantDocuments('268a5e5'));
    store.dispatch.should.not.be.calledWith(fetchPinboardRelevantCoaccusals('268a5e5'));
    store.dispatch.should.not.be.calledWith(fetchPinboardRelevantComplaints('268a5e5'));
  });

  it('should dispatch fetchAllPinboards when location changes', function () {
    const action = createLocationChangeAction('/view-all-pinboards/?match=skullcap');
    const fetchAllPinboardsStub = stub(pinboardAdminAction, 'fetchAllPinboards');
    const clock = useFakeTimers();
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    clock.tick(1000);
    store.dispatch.should.be.calledWith(fetchAllPinboardsStub({ match: 'skullcap' }));
  });

  it('should dispatch fetchAllPinboards when signing in successfully', function () {
    const store = buildStore();
    _.set(store._state, 'pathname', '/view-all-pinboards/');
    const action = createSignInRequestSuccessAction();
    let dispatched;
    const fetchAllPinboardsStub = stub(pinboardAdminAction, 'fetchAllPinboards');

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(fetchAllPinboardsStub()).should.be.true();
  });

  it('should dispatch fetchToast when they do not exists', function () {
    const action = createLocationChangeAction('/');
    let dispatched;
    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.calledWith(fetchToast()).should.be.true();
  });

  context('LOCATION_CHANGE', function () {
    let fetchAppConfigStub;
    let locationChangeAction;
    let clock;
    beforeEach(function () {
      fetchAppConfigStub = stub(appConfigActions, 'fetchAppConfig');
      locationChangeAction = createLocationChangeAction('/search');
      clock = useFakeTimers();
    });

    context('appConfig is empty', function () {
      it('should fetch app config', function () {
        stub(appConfig.default, 'isEmpty').returns(true);
        fetchPageInitialData(store)(() => {})(locationChangeAction);
        clock.tick(1000);
        store.dispatch.calledWith(fetchAppConfigStub()).should.be.true();
      });
    });

    context('appConfig is not empty', function () {
      it('should not fetch app config', function () {
        stub(appConfig.default, 'isEmpty').returns(false);
        fetchPageInitialData(store)(() => {})(locationChangeAction);
        clock.tick(1000);
        store.dispatch.calledWith(fetchAppConfigStub()).should.be.false();
      });
    });
  });
});
