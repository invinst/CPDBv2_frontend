import vftgSectionFields from 'reducers/landing-page/vftg-section/fields';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { RichTextFieldFactory, LinkFieldFactory, DateFieldFactory } from 'utils/test/factories/field';


describe('vftgSectionFields reducer', function () {
  it('should return initial state', function () {
    vftgSectionFields(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    vftgSectionFields(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    const vftgHeaderField = RichTextFieldFactory.build({ name: 'vftg_header' });
    const vftgContentField = RichTextFieldFactory.build({ name: 'vftg_content' });
    const vftgLinkField = LinkFieldFactory.build({ name: 'vftg_link' });
    const vftgDateField = DateFieldFactory.build({ name: 'vftg_date' });

    vftgSectionFields(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [
          vftgContentField, vftgLinkField, vftgDateField, vftgHeaderField
        ]
      }
    }).should.eql({
      'vftg_header': vftgHeaderField,
      'vftg_content': vftgContentField,
      'vftg_link': vftgLinkField,
      'vftg_date': vftgDateField
    });
  });
});
