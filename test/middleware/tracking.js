import sinon from 'sinon';

import trackingMiddleware from 'middleware/tracking';
import * as constants from 'utils/constants';
import * as tracking from 'utils/tracking';


describe('trackingMiddleware', function () {
  it('should send pageview event on LOCATION_CHANGE', function () {
    sinon.stub(tracking, 'trackPageView');

    let dispatched;
    const dispatchAction = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: { pathname: 'abc' },
      },
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackPageView.should.be.calledWith('abc');
  });

  it('should send pageview event on CHANGE_SEARCH_QUERY', function () {
    sinon.stub(tracking, 'trackSearchQuery');

    let dispatched;
    const dispatchAction = {
      type: constants.CHANGE_SEARCH_QUERY,
      payload: 'abc',
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackSearchQuery.should.be.calledWith('abc');
  });

  it('should send pageview event on SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    sinon.stub(tracking, 'trackSearchResultsCount');

    let dispatched;
    const dispatchAction = {
      type: constants.SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        count: 203,
        results: [],
      },
      request: { params: {} },
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackSearchResultsCount.should.be.calledWith(203);
  });

  it('should trackSingleSearchResults on SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    sinon.stub(tracking, 'trackSingleSearchResults');

    let dispatched;
    const dispatchAction = {
      type: constants.SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        count: 203,
        results: [{ id: 1 }, { id: 2 }],
      },
      request: { params: { contentType: 'OFFICER', term: '123' } },
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackSingleSearchResults.should.be.calledWith('OFFICER', '123', 2);
  });

  it('should send pageview event on SUGGESTION_REQUEST_SUCCESS', function () {
    sinon.stub(tracking, 'trackSearchResultsCount');

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
  });
});
