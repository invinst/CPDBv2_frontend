import heroSectionReducer from 'reducers/landing-page/hero-section';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


describe('heroSectionReducer reducer', function () {
  it('should return initial state', function () {
    heroSectionReducer(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    heroSectionReducer(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    heroSectionReducer(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        'hero_complaints_text': 'abc',
        'hero_use_of_force_text': 'def'
      }
    }).should.eql({
      complaintsText: 'abc',
      useOfForceText: 'def'
    });
  });
});
