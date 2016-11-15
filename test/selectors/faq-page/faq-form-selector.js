import { getIsSubmitting } from 'selectors/faq-page/faq-form-selector';


describe('faqPageFaqForm selectors', function () {
  describe('getIsSubmitting', function () {
    it('should return faqForm submitting value', function () {
      const isSubmitting = 'isSubmitting';
      const state = {
        faqPage: {
          faqForm: {
            isSubmitting: isSubmitting
          }
        }
      };
      getIsSubmitting(state).should.eql(isSubmitting);
    });
  });
});
