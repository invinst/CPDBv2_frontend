import faqSectionFields from 'reducers/landing-page/faq-section/fields';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { PlainTextFieldFactory, RandomizerFieldFactory } from 'utils/test/factories/field';


describe('faqSectionFields reducer', function () {
  it('should return initial state', function () {
    faqSectionFields(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    faqSectionFields(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    const faqRandomizerField = RandomizerFieldFactory.build({ name: 'faq_randomizer' });
    const faqHeaderField = PlainTextFieldFactory.build({ name: 'faq_header' });

    faqSectionFields(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [
          faqRandomizerField, faqHeaderField
        ]
      }
    }).should.eql({
      'faq_randomizer': faqRandomizerField,
      'faq_header': faqHeaderField
    });
  });
});
