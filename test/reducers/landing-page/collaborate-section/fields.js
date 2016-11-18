import collaborateSectionFields from 'reducers/landing-page/collaborate-section/fields';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { PlainTextFieldFactory, MultilineTextFieldFactory } from 'utils/test/factories/field';


describe('collaborateSectionFields reducer', function () {
  it('should return initial state', function () {
    collaborateSectionFields(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    collaborateSectionFields(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    const collaborateHeader = PlainTextFieldFactory.build({ name: 'collaborate_header' });
    const collaborateContent = MultilineTextFieldFactory.build({ name: 'collaborate_content' });

    collaborateSectionFields(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [collaborateHeader, collaborateContent]
      }
    }).should.eql({
      'collaborate_header': collaborateHeader,
      'collaborate_content': collaborateContent
    });
  });
});
