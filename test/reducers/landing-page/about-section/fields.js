import aboutSectionFields from 'reducers/landing-page/about-section/fields';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { PlainTextFieldFactory, MultilineTextFieldFactory } from 'utils/test/factories/field';


describe('aboutSectionFields reducer', function () {
  it('should return initial state', function () {
    aboutSectionFields(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    aboutSectionFields(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    const aboutHeader = PlainTextFieldFactory.build({ name: 'about_header' });
    const aboutContent = MultilineTextFieldFactory.build({ name: 'about_content' });

    aboutSectionFields(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [aboutHeader, aboutContent]
      }
    }).should.eql({
      'about_header': aboutHeader,
      'about_content': aboutContent
    });
  });
});
