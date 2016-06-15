import React from 'react';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedFAQPageContainer } from 'containers/faq-page-container';
import FAQListSection from 'components/faq-page/faq-list-section';
import FAQListSectionPlaceHolder from 'components/faq-page/faq-list-section-placeholder';
import FAQFactory from 'utils/test/factories/faq';
import PaginationFactory from 'utils/test/factories/pagination';

const mockStore = configureStore();
const store = mockStore({
  faqPage: {
    faqs: PaginationFactory.build({ results: FAQFactory.buildList(5) }),
    faqForm: {

    }
  }
});


describe('UnconnectedFAQPageContainer', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render FAQListSection when data is available', function () {
    instance = renderIntoDocument(
      <UnconnectedFAQPageContainer requestFAQs={ () => {} } faqs={ FAQFactory.buildList(3) }
        dataAvailable={ true } store={ store }/>
    );
    findRenderedComponentWithType(instance, FAQListSection);
  });

  it('should render FAQListSectionPlaceHolder when data is not available', function () {
    instance = renderIntoDocument(
      <UnconnectedFAQPageContainer requestFAQs={ () => {} } faqs={ [] } dataAvailable={ false }/>
    );
    findRenderedComponentWithType(instance, FAQListSectionPlaceHolder);
  });

  it('should call requestFAQs when it just mount', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedFAQPageContainer requestFAQs={ callback } faqs={ [] } dataAvailable={ false }/>
    );
    callback.called.should.be.true();
  });
});
