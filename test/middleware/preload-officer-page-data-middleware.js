import preloadOfficerPageDataMiddleware from 'middleware/preload-officer-page-data-middleware';
import { spy } from 'sinon';
import { changeOfficerId, fetchOfficerSummary, fetchOfficerMetrics } from 'actions/officer-page';

import { fetchSocialGraph } from 'actions/officer-page/social-graph';
import { fetchNewTimelineItems } from 'actions/officer-page/new-timeline';


describe('preload-officer-page-data-middleware', function () {
  const store = {
    getState() {
      return {
        officerPage: {
          officerId: 1,
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

    preloadOfficerPageDataMiddleware(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(changeOfficerId(2)).should.be.true();
    store.dispatch.calledWith(fetchOfficerSummary(2)).should.be.true();
    store.dispatch.calledWith(fetchOfficerMetrics(2)).should.be.true();
    store.dispatch.calledWith(fetchSocialGraph(2)).should.be.true();
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

    preloadOfficerPageDataMiddleware(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(changeOfficerId(1)).should.be.false();
    store.dispatch.calledWith(fetchOfficerSummary(1)).should.be.false();
    store.dispatch.calledWith(fetchOfficerMetrics(1)).should.be.false();
    store.dispatch.calledWith(fetchSocialGraph(1)).should.be.false();
    store.dispatch.calledWith(fetchNewTimelineItems(1)).should.be.false();
  });
});
