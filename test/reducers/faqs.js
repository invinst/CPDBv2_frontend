import FaqFactory from 'utils/test/factories/faq';
import faqs from 'reducers/faqs';
import { FAQS_REQUEST_SUCCESS, UPDATE_FAQ_REQUEST_SUCCESS, BULK_UPDATE_FAQS_SUCCESS } from 'utils/constants';
import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';
import { RandomizedListFieldFactory } from 'utils/test/factories/field';


describe('faqs', function () {
  it('should return initial state', function () {
    faqs(undefined, {}).should.eql({});
  });

  it('should handle FAQS_REQUEST_SUCCESS', function () {
    const results = FaqFactory.buildList(2);
    faqs(undefined, {
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
    faqs(previousState, {
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
    const currentFaqFactoryId = FaqFactory.build().id;
    const faqsField = RandomizedListFieldFactory.build({ name: 'faqs' }, { subFactory: FaqFactory });
    faqs(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [faqsField]
      }
    }).should.eql({
      [currentFaqFactoryId + 1]: faqsField.value[0],
      [currentFaqFactoryId + 2]: faqsField.value[1],
      [currentFaqFactoryId + 3]: faqsField.value[2]
    });
  });

  it('should handle BULK_UPDATE_FAQS_SUCCESS', function () {
    const results = FaqFactory.buildList(2);
    faqs(undefined, {
      type: BULK_UPDATE_FAQS_SUCCESS,
      payload: results
    }).should.eql({
      [results[0].id]: results[0],
      [results[1].id]: results[1]
    });
  });
});
