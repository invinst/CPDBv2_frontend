import { stub } from 'sinon';

import IntercomLoggingMiddleware from 'middleware/intercom-logging';
import { openBottomSheetWithReport, openBottomSheetWithFAQ } from 'actions/bottom-sheet';
import { expandFAQ } from 'actions/faq-page/index';
import * as intercomUtils from 'utils/intercom';

describe('intercomLoggingMiddleware', function () {
  beforeEach(function () {
    stub(intercomUtils, 'trackClickedReportingItem');
    stub(intercomUtils, 'trackClickedFaqItem');
  });

  afterEach(function () {
    intercomUtils.trackClickedReportingItem.restore();
    intercomUtils.trackClickedFaqItem.restore();
  });

  it('should log event using intercom on OPEN_BOTTOM_SHEET_WITH_REPORT', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithReport({ id: 14, title: 'I am a title' });
    IntercomLoggingMiddleware({})(action => dispatched = action)(dispatchAction);
    intercomUtils.trackClickedReportingItem.calledOnce.should.equal(true);
    intercomUtils.trackClickedReportingItem.calledWith(14, 'I am a title').should.equal(true);

    dispatched.should.eql(dispatchAction);
  });

  it('should log event using intercom on EXPAND_FAQ', function () {
    let dispatched;
    const dispatchAction = expandFAQ({ id: 6, question: 'q', answer: 'a' });
    IntercomLoggingMiddleware({})(action => dispatched = action)(dispatchAction);
    intercomUtils.trackClickedFaqItem.calledOnce.should.equal(true);
    intercomUtils.trackClickedFaqItem.calledWith(6, 'q', 'a').should.equal(true);

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

    IntercomLoggingMiddleware({
      getState: () => ({ faqs: [faq] })
    })(action => dispatched = action)(dispatchAction);
    intercomUtils.trackClickedFaqItem.calledOnce.should.equal(true);
    intercomUtils.trackClickedFaqItem.calledWith(16, 'q', 'a').should.equal(true);

    dispatched.should.eql(dispatchAction);
  });
});
