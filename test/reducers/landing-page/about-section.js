import aboutSectionReducer from 'reducers/landing-page/about-section';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


describe('aboutSection reducer', function () {
  it('should return initial state', function () {
    aboutSectionReducer(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    aboutSectionReducer(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    aboutSectionReducer(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        'about_header': 'abc',
        'about_content': [{
          type: 'paragraph',
          value: 'a'
        }]
      }
    }).should.eql({
      headerText: 'abc',
      body: [{
        type: 'paragraph',
        value: 'a'
      }]
    });
  });
});
