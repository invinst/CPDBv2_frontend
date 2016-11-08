import reportSectionFields from 'reducers/landing-page/report-section/fields';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { PlainTextFieldFactory, RandomizerFieldFactory } from 'utils/test/factories/field';


describe('reportSectionFields reducer', function () {
  it('should return initial state', function () {
    reportSectionFields(undefined, {}).should.eql({});
  });

  it('should clear data when request fail', function () {
    reportSectionFields(undefined, { type: LANDING_PAGE_REQUEST_FAILURE }).should.eql({});
  });

  it('should clear data when request succeed', function () {
    const reportingRandomizerField = RandomizerFieldFactory.build({ name: 'reporting_randomizer' });
    const reportingHeaderField = PlainTextFieldFactory.build({ name: 'reporting_header' });

    reportSectionFields(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [
          reportingRandomizerField, reportingHeaderField
        ]
      }
    }).should.eql({
      'reporting_randomizer': reportingRandomizerField,
      'reporting_header': reportingHeaderField
    });
  });
});
