import faqSection from 'reducers/landing-page/faq-section';


describe('faqSection reducer', function () {
  it('should return initial state', function () {
    faqSection(undefined, {}).should.eql({
      fields: {},
      editModeOn: false,
      faqs: []
    });
  });
});
