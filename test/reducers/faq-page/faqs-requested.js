import { FAQS_REQUEST_START } from 'utils/constants';
import faqsRequested from 'reducers/faq-page/faqs-requested';


describe('faqsRequested reducer', function () {
  it('should return initial state', function () {
    faqsRequested(undefined, {}).should.be.false();
  });

  it('should handle FAQS_REQUEST_START', function () {
    faqsRequested(undefined, {
      type: FAQS_REQUEST_START
    }).should.be.true();
  });
});
