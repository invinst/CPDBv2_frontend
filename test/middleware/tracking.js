import { stub } from 'sinon';

import trackingMiddleware from 'middleware/tracking';
import * as constants from 'utils/constants';
import * as tracking from 'utils/tracking';


describe('trackingMiddleware', function () {
  it('should send pageview event on LOCATION_CHANGE', function () {
    stub(tracking, 'trackPageView');

    let dispatched;
    const dispatchAction = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: 'abc',
      },
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackPageView.should.be.calledWith('abc');

    tracking.trackPageView.restore();
  });

  it('should send pageview event on CHANGE_SEARCH_QUERY', function () {
    stub(tracking, 'trackSearchQuery');

    let dispatched;
    const dispatchAction = {
      type: constants.CHANGE_SEARCH_QUERY,
      payload: 'abc',
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackSearchQuery.should.be.calledWith('abc');

    tracking.trackSearchQuery.restore();
  });

  it('should send pageview event on SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    stub(tracking, 'trackSearchResultsCount');

    let dispatched;
    const dispatchAction = {
      type: constants.SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        count: 203,
      },
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackSearchResultsCount.should.be.calledWith(203);

    tracking.trackSearchResultsCount.restore();
  });

  it('should send pageview event on SUGGESTION_REQUEST_SUCCESS', function () {
    stub(tracking, 'trackSearchResultsCount');

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
    tracking.trackSearchResultsCount.should.be.calledWith(3);

    tracking.trackSearchResultsCount.restore();
  });
});
