import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedFAQPageContainer } from 'containers/faq-page-container';
import FAQListSection from 'components/faq-page/faq-list-section';
import FAQListSectionPlaceHolder from 'components/faq-page/faq-list-section-placeholder';
import FAQFactory from 'utils/test/factories/faq';


describe('UnconnectedFAQPageContainer', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render FAQListSection when data is available', function () {
    instance = renderIntoDocument(
      <UnconnectedFAQPageContainer requestFAQs={ () => {} } faqs={ FAQFactory.buildList(3) }
        dataAvailable={ true } askQuestion={ () => {} }/>
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
