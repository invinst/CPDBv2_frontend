import { Promise } from 'es6-promise';
import { stub } from 'sinon';

import fetchPageInitialData from 'middleware/fetch-page-initial-data';
import { changeOfficerId, fetchOfficerSummary } from 'actions/officer-page';
import { LANDING_PAGE_ID } from 'utils/constants';
import { fetchSocialGraph } from 'actions/officer-page/social-graph';
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


const createLocationChangeAction = (pathname) => ({
  type: '@@router/LOCATION_CHANGE',
  payload: {
    pathname: pathname
  }
});

describe('fetchPageInitialData middleware', function () {
  const store = {
    getState() {
      return {
        cms: {
          pages: {},
        },
        landingPage: {
          heatMap: {
            communities: null,
            citySummary: {},
            clusterGeoJson: null
          },
          officersByAllegation: {
            cards: []
          },
          recentDocument: {
            cards: []
          },
          complaintSummaries: {
            cards: []
          },
          activityGrid: {
            cards: []
          }
        },
        faqPage: {
          faqsRequested: false
        }
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('abc')
  };

  beforeEach(function () {
    store.dispatch.resetHistory();
  });

  it('should not dispatch any action if action is not LOCATION_CHANGE', function () {
    const action = {
      type: 'other action'
    };
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.called.should.be.false();
  });

  it('should dispatch officer actions if officer id change', function () {
    const locationChangeAction = createLocationChangeAction('/officer/2/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(changeOfficerId(2)).should.be.true();
    store.dispatch.calledWith(fetchOfficerSummary(2)).should.be.true();
    store.dispatch.calledWith(fetchSocialGraph(2)).should.be.true();
    store.dispatch.calledWith(fetchNewTimelineItems(2)).should.be.true();
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

  it('should dispatch fetch data for landing page when they do not exist', function () {
    const action = createLocationChangeAction('/');
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
    }, 0);
  });

  it('should dispatch requestSearchTermCategories', function () {
    const action = createLocationChangeAction('/search/terms/');
    let dispatched;

    fetchPageInitialData(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(requestSearchTermCategories()).should.be.true();
  });
});
