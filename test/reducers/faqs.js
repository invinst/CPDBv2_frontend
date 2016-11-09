import ReportFactory from 'utils/test/factories/report';
import reports from 'reducers/reports';
import {
  FAQS_REQUEST_SUCCESS, UPDATE_FAQ_REQUEST_SUCCESS
} from 'actions/faq-page';
import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';
import { RandomizedListFieldFactory } from 'utils/test/factories/field';


describe('faqs', function () {
  it('should return initial state', function () {
    reports(undefined, {}).should.eql({});
  });

  it('should handle FAQS_REQUEST_SUCCESS', function () {
    const results = ReportFactory.buildList(2);
    reports(undefined, {
      type: FAQS_REQUEST_SUCCESS,
      payload: { results }
    }).should.eql({
      [results[0].id]: results[0],
      [results[1].id]: results[1]
    });
  });

  it('should handle UPDATE_FAQ_REQUEST_SUCCESS', function () {
    const previousState = {
      1: {
        fields: 'previousField',
        id: 1
      }
    };
    reports(previousState, {
      type: UPDATE_FAQ_REQUEST_SUCCESS,
      payload: { id: 1, fields: 'newField' }
    }).should.eql({
      1: {
        id: 1,
        fields: 'newField'
      }
    });
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    const currentReportFactoryId = ReportFactory.build().id;
    const reportsField = RandomizedListFieldFactory.build({ name: 'faqs' }, { subFactory: ReportFactory });
    reports(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [reportsField]
      }
    }).should.eql({
      [currentReportFactoryId + 1]: reportsField.value[0],
      [currentReportFactoryId + 2]: reportsField.value[1],
      [currentReportFactoryId + 3]: reportsField.value[2]
    });
  });
});
