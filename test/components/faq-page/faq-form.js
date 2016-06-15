import FAQForm from 'components/faq-page/faq-form';


describe('FAQForm component', function () {
  it('should be renderable', function () {
    FAQForm.should.be.renderable({ handleSubmit: () => {} });
  });
});
