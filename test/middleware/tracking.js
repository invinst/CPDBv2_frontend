import { stub } from 'sinon';

import trackingMiddleware from 'middleware/tracking';
import { openBottomSheetWithReport, openBottomSheetWithFAQ } from 'actions/bottom-sheet';
import { expandFAQ } from 'actions/faq-page/index';
import * as trackingUtils from 'utils/tracking';
import * as constants from 'utils/constants';


describe('trackingMiddleware', function () {
  beforeEach(function () {
    stub(trackingUtils, 'trackIntercomClickedFaqEvent');
    stub(trackingUtils, 'trackIntercomClickedReportEvent');
    stub(trackingUtils, 'trackInternalEvent');
  });

  afterEach(function () {
    trackingUtils.trackIntercomClickedReportEvent.restore();
    trackingUtils.trackIntercomClickedFaqEvent.restore();
    trackingUtils.trackInternalEvent.restore();
  });

  it('should log event using intercom on OPEN_BOTTOM_SHEET_WITH_REPORT', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithReport({ id: 14, title: 'I am a title' });
    trackingMiddleware({})(action => dispatched = action)(dispatchAction);
    trackingUtils.trackIntercomClickedReportEvent.calledOnce.should.be.true();
    trackingUtils.trackIntercomClickedReportEvent.calledWith(14, 'I am a title').should.be.true();

    trackingUtils.trackInternalEvent.calledOnce.should.be.true();
    trackingUtils.trackInternalEvent.calledWith('report-click', { 'id': 14, 'title': 'I am a title' })
      .should.be.true();

    dispatched.should.eql(dispatchAction);
  });

  it('should log event using intercom on EXPAND_FAQ', function () {
    let dispatched;
    const dispatchAction = expandFAQ({ id: 6, question: 'q', answer: 'a' });
    trackingMiddleware({})(action => dispatched = action)(dispatchAction);
    trackingUtils.trackIntercomClickedFaqEvent.calledOnce.should.be.true();
    trackingUtils.trackIntercomClickedFaqEvent.calledWith(6, 'q', 'a').should.be.true();

    trackingUtils.trackInternalEvent.calledOnce.should.be.true();
    trackingUtils.trackInternalEvent.calledWith(
      'faq-click', { 'id': 6, 'question': 'q', 'answer': 'a' }
    ).should.be.true();

    dispatched.should.eql(dispatchAction);
  });

  it('should log event using intercom on OPEN_BOTTOM_SHEET_WITH_FAQ', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithFAQ(16);
    const faq = {
      'fields': [
        {
          'name': 'question',
          'value': {
            'blocks': [
              {
                'text': 'q'
              }
            ]
          }
        },
        {
          'name': 'answer',
          'value': {
            'blocks': [
              {
                'text': 'a'
              }
            ]
          }
        }
      ],
      'id': 16
    };

    trackingMiddleware({
      getState: () => ({ faqs: [faq] })
    })(action => dispatched = action)(dispatchAction);
    trackingUtils.trackIntercomClickedFaqEvent.calledOnce.should.be.true();
    trackingUtils.trackIntercomClickedFaqEvent.calledWith(16, 'q', 'a').should.be.true();

    trackingUtils.trackInternalEvent.calledOnce.should.be.true();
    trackingUtils.trackInternalEvent.calledWith(
      'faq-click', { 'id': 16, 'question': 'q', 'answer': 'a' }
    ).should.be.true();

    dispatched.should.eql(dispatchAction);
  });

  it('should send pageview event on LOCATION_CHANGE', function () {
    let dispatched;
    const dispatchAction = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: 'abc'
      }
    };

    stub(global, 'ga');
    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    global.ga.calledWith('send', 'pageview', { page: 'abc' }).should.be.true();
    global.ga.restore();
  });

  it('should send pageview event on CHANGE_SEARCH_QUERY', function () {
    let dispatched;
    const dispatchAction = {
      type: constants.CHANGE_SEARCH_QUERY,
      payload: 'abc'
    };

    stub(trackingUtils, 'throttledGA');
    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    trackingUtils.throttledGA.calledWith('send', 'event', {
      eventCategory: 'search',
      eventAction: 'change_query',
      eventLabel: 'abc'
    }).should.be.true();
    trackingUtils.throttledGA.restore();
  });

  it('should send pageview event on SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    let dispatched;
    const dispatchAction = {
      type: constants.SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        count: 203
      }
    };

    stub(global, 'ga');
    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    global.ga.calledWith('send', 'event', {
      eventCategory: 'search',
      eventAction: 'num_results',
      eventValue: 203
    }).should.be.true();
    global.ga.restore();
  });

  it('should send pageview event on SUGGESTION_REQUEST_SUCCESS', function () {
    let dispatched;
    const dispatchAction = {
      type: constants.SUGGESTION_REQUEST_SUCCESS,
      payload: {
        'COMMUNITY': [1, 2],
        'CR': [1]
      }
    };

    stub(global, 'ga');
    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    global.ga.calledWith('send', 'event', {
      eventCategory: 'search',
      eventAction: 'num_results',
      eventValue: 3
    }).should.be.true();
    global.ga.restore();
  });
});
