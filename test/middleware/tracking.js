import { stub } from 'sinon';

import trackingMiddleware from 'middleware/tracking';
import * as constants from 'utils/constants';
import * as GATracking from 'utils/google_analytics_tracking';


describe('trackingMiddleware', function () {
  it('should send pageview event on LOCATION_CHANGE', function () {
    stub(GATracking, 'trackPageView');

    let dispatched;
    const dispatchAction = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: 'abc',
      },
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    GATracking.trackPageView.should.be.calledWith('abc');

    GATracking.trackPageView.restore();
  });

  it('should send pageview event on CHANGE_SEARCH_QUERY', function () {
    stub(GATracking, 'trackSearchQuery');

    let dispatched;
    const dispatchAction = {
      type: constants.CHANGE_SEARCH_QUERY,
      payload: 'abc',
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    GATracking.trackSearchQuery.should.be.calledWith('abc');

    GATracking.trackSearchQuery.restore();
  });

  it('should send pageview event on SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    stub(GATracking, 'trackSearchResultsCount');

    let dispatched;
    const dispatchAction = {
      type: constants.SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        count: 203,
      },
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    GATracking.trackSearchResultsCount.should.be.calledWith(203);

    GATracking.trackSearchResultsCount.restore();
  });

  it('should send pageview event on SUGGESTION_REQUEST_SUCCESS', function () {
    stub(GATracking, 'trackSearchResultsCount');

    let dispatched;
    const dispatchAction = {
      type: constants.SUGGESTION_REQUEST_SUCCESS,
      payload: {
        'COMMUNITY': [1, 2],
        'CR': [1],
      },
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    GATracking.trackSearchResultsCount.should.be.calledWith(3);

    GATracking.trackSearchResultsCount.restore();
  });
});
