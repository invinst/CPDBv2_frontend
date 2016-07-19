import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedFAQContainer } from 'containers/faq-container';
import FAQFactory from 'utils/test/factories/faq';
import FAQSection from 'components/landing-page/faq/faq-section';
import FAQSectionPlaceHolder from 'components/landing-page/faq/faq-section-place-holder';


describe('UnconnectedFAQContainer', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render FAQSection when data is available', function () {
    element = renderIntoDocument(
      <UnconnectedFAQContainer requestFAQs={ () => {} } faqs={ FAQFactory.buildList(3) } dataAvailable={ true }
        openBottomSheetWithFAQ={ () => {} }/>
    );
    findRenderedComponentWithType(element, FAQSection);
  });

  it('should render FAQSectionPlaceHolder when data is not available', function () {
    element = renderIntoDocument(
      <UnconnectedFAQContainer requestFAQs={ () => {} } faqs={ [] } dataAvailable={ false }
        openBottomSheetWithFAQ={ () => {} }/>
    );
    findRenderedComponentWithType(element, FAQSectionPlaceHolder);
  });

  it('should call requestFAQs when it just mount', function () {
    const callback = spy();
    element = renderIntoDocument(
      <UnconnectedFAQContainer requestFAQs={ callback } faqs={ [] } dataAvailable={ false }
        openBottomSheetWithFAQ={ () => {} }/>
    );
    callback.called.should.be.true();
  });

  it('should call openBottomSheetWithFAQ when click on More FAQ', function () {
    UnconnectedFAQContainer.should.triggerCallbackWhenClick('openBottomSheetWithFAQ', 'article-small', {
      requestFAQs: () => {},
      faqs: FAQFactory.buildList(3),
      dataAvailable: true
    });
  });
});
