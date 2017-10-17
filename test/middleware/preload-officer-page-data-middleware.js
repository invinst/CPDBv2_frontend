import preloadOfficerPageDataMiddleware from 'middleware/preload-officer-page-data-middleware';
import { spy } from 'sinon';
import { changeOfficerId, fetchOfficerSummary } from 'actions/officer-page';
import { fetchTimelineItems, fetchMinimap } from 'actions/officer-page/timeline';
import { fetchSocialGraph } from 'actions/officer-page/social-graph';


describe('preload-officer-page-data-middleware', function () {
  const store = {
    getState() {
      return {
        officerPage: {
          officerId: 1,
          timeline: {
            sortDescending: true
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
        pathname: '/officer/2/'
      }
    };
    let dispatched;

    preloadOfficerPageDataMiddleware(store)(action => dispatched = action)(locationChangeAction);
    dispatched.should.eql(locationChangeAction);
    store.dispatch.calledWith(changeOfficerId(2)).should.be.true();
    store.dispatch.calledWith(fetchOfficerSummary(2)).should.be.true();
    store.dispatch.calledWith(fetchSocialGraph(2)).should.be.true();
    store.dispatch.calledWith(fetchTimelineItems(2, {})).should.be.true();
    store.dispatch.calledWith(fetchMinimap(2)).should.be.true();
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
    store.dispatch.calledWith(fetchSocialGraph(1)).should.be.false();
    store.dispatch.calledWith(fetchTimelineItems(1, {})).should.be.false();
    store.dispatch.calledWith(fetchMinimap(1)).should.be.false();
  });
});
