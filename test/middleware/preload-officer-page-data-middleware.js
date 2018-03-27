import preloadOfficerPageDataMiddleware from 'middleware/preload-officer-page-data-middleware';
import { spy, stub } from 'sinon';
import { changeOfficerId, fetchOfficerSummary, fetchOfficerMetrics } from 'actions/officer-page';

import * as timelineActions from 'actions/officer-page/timeline';
import * as minimapActions from 'actions/officer-page/timeline-minimap';
const {
  fetchTimelineFirstItems,
  changeTimelineFilters,
  clearSelectedItemIndex
} = timelineActions;

import { fetchSocialGraph } from 'actions/officer-page/social-graph';
import * as timelineSelectors from 'selectors/officer-page/timeline';
import { fetchNewTimelineItems } from 'actions/officer-page/new-timeline';


describe('preload-officer-page-data-middleware', function () {
  beforeEach(function () {
    stub(minimapActions, 'fetchMinimapThenSelectTimelineItem');
  });

  afterEach(function () {
    minimapActions.fetchMinimapThenSelectTimelineItem.restore();
  });

  const store = {
    getState() {
      return {
        officerPage: {
          officerId: 1,
          timeline: {
            sortDescending: true,
            filters: {}
          }
        }
      };
    },
    dispatch: spy()
  };

  it('should dispatch actions', function () {
    const locationChangeAction = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/officer/2/',
        query: {
          year: 2000
        }
      }
    };
    let dispatched;
    minimapActions.fetchMinimapThenSelectTimelineItem
      .withArgs(2, {}, 2000)
      .returns('fetchMinimapThenSelectTimelineItemResult');

    preloadOfficerPageDataMiddleware(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(changeOfficerId(2)).should.be.true();
    store.dispatch.calledWith(fetchOfficerSummary(2)).should.be.true();
    store.dispatch.calledWith(fetchOfficerMetrics(2)).should.be.true();
    store.dispatch.calledWith(fetchSocialGraph(2)).should.be.true();
    store.dispatch.calledWith(fetchTimelineFirstItems(2, {})).should.be.true();
    store.dispatch.calledWith('fetchMinimapThenSelectTimelineItemResult').should.be.true();
    store.dispatch.calledWith(fetchNewTimelineItems(2)).should.be.true();
  });

  it('should not dispatch actions if officer id is not changed', function () {
    const locationChangeAction = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/officer/1/'
      }
    };
    let dispatched;
    const { fetchMinimapThenSelectTimelineItem } = minimapActions;

    preloadOfficerPageDataMiddleware(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(changeOfficerId(1)).should.be.false();
    store.dispatch.calledWith(fetchOfficerSummary(1)).should.be.false();
    store.dispatch.calledWith(fetchOfficerMetrics(1)).should.be.false();
    store.dispatch.calledWith(fetchSocialGraph(1)).should.be.false();
    store.dispatch.calledWith(fetchTimelineFirstItems(1, {})).should.be.false();
    store.dispatch.calledWith(fetchMinimapThenSelectTimelineItem(1)).should.be.false();
    store.dispatch.calledWith(fetchNewTimelineItems(1)).should.be.false();
  });

  it('should dispatch changeTimelineFilters when navigating to Timeline Page', function () {
    const locationChangeAction = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/officer/1/timeline/',
        query: { category: 'Illegal Search' }
      }
    };
    let dispatched;

    preloadOfficerPageDataMiddleware(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);

    store.dispatch.calledWith(changeTimelineFilters({ category: 'Illegal Search' })).should.be.true();
  });

  describe('when filters changed but officer id has not changed', function () {
    beforeEach(function () {
      stub(timelineSelectors, 'getTimelineFilters');
      timelineSelectors.getTimelineFilters.onCall(0).returns({ category: 'Illegal Search' });
      timelineSelectors.getTimelineFilters.onCall(1).returns({ race: 'Black' });
    });

    afterEach(function () {
      timelineSelectors.getTimelineFilters.restore();
    });

    it('should still dispatch "fetch" actions', function () {
      const locationChangeAction = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/officer/1/timeline/',
          query: { race: 'Black' }
        }
      };
      let dispatched;
      minimapActions.fetchMinimapThenSelectTimelineItem
        .withArgs(1, { race: 'Black' }, 2000)
        .returns('fetchMinimapThenSelectTimelineItemResult');

      preloadOfficerPageDataMiddleware(store)(action => dispatched = action)(locationChangeAction);
      dispatched.should.eql(locationChangeAction);

      store.dispatch.calledWith(changeTimelineFilters({ race: 'Black' })).should.be.true();
      store.dispatch.calledWith(fetchTimelineFirstItems(1, { race: 'Black' })).should.be.true();
      store.dispatch.calledWith('fetchMinimapThenSelectTimelineItemResult').should.be.true();
      store.dispatch.calledWith(clearSelectedItemIndex()).should.be.true();
    });

  });

});
