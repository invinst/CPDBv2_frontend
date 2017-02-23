import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import FAQListWrapper from 'components/faq-page/faq-list-wrapper';
import DroppableFAQListSection from 'components/faq-page/droppable-faq-list-section';
import FAQListSection from 'components/faq-page/faq-list-section';
import { unmountComponentSuppressError } from 'utils/test';
import { renderInDragDropContext } from 'utils/test';


describe('FAQListWrapper component', function () {
  let instance;

  beforeEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should call requestFAQs if not request yet', function () {
    const requestFAQs = spy();
    instance = renderIntoDocument(
      <FAQListWrapper requested={ false } requestFAQs={ requestFAQs }/>
    );

    requestFAQs.called.should.be.true();
  });

  it('should render DroppableFAQListSection if edit mode on', function () {
    instance = renderInDragDropContext(
      <FAQListWrapper editModeOn={ true } faqs={ [] }/>
    );

    scryRenderedComponentsWithType(instance, DroppableFAQListSection).length.should.equal(1);
  });

  it('should render FAQListSection if edit mode off', function () {
    instance = renderIntoDocument(
      <FAQListWrapper editModeOn={ false }/>
    );

    scryRenderedComponentsWithType(instance, FAQListSection).length.should.equal(1);
  });
});
