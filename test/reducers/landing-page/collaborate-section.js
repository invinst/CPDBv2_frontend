import collaborateSectionReducer from 'reducers/landing-page/collaborate-section';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


describe('collaborateSection reducer', function () {
  it('should return initial state', function () {
    collaborateSectionReducer(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    collaborateSectionReducer(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    collaborateSectionReducer(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        'collaborate_header': 'abc',
        'collaborate_content': [{
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
