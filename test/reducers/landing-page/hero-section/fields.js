import heroSectionFields from 'reducers/landing-page/hero-section/fields';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { RichTextFieldFactory } from 'utils/test/factories/field';


describe('heroSectionFields reducer', function () {
  it('should return initial state', function () {
    heroSectionFields(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    heroSectionFields(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    const heroTitle = RichTextFieldFactory.build({ name: 'hero_title' });
    const heroComplaintText = RichTextFieldFactory.build({ name: 'hero_complaint_text' });
    const heroUseOfForceText = RichTextFieldFactory.build({ name: 'hero_use_of_force_text' });

    heroSectionFields(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [heroTitle, heroComplaintText, heroUseOfForceText]
      }
    }).should.eql({
      'hero_title': heroTitle,
      'hero_complaint_text': heroComplaintText,
      'hero_use_of_force_text': heroUseOfForceText
    });
  });
});
