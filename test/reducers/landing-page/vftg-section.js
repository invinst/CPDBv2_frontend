import vftgSectionReducer from 'reducers/landing-page/vftg-section';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


describe('vftgSection reducer', function () {
  it('should return initial state', function () {
    vftgSectionReducer(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    vftgSectionReducer(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    vftgSectionReducer(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        'vftg_header': 'abc',
        'vftg_date': '2016-09-22',
        'vftg_content': 'def',
        'vftg_link': 'http://example.com'
      }
    }).should.eql({
      headerText: 'abc',
      date: '2016-09-22',
      contentText: 'def',
      contentLink: 'http://example.com'
    });
  });
});
