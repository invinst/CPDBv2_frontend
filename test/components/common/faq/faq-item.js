import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';

import FAQItem from 'components/common/faq/faq-item';


describe('FAQItem component', function () {
  const fieldProps = { question: {} };

  it('should be renderable', function () {
    FAQItem.should.be.renderable({ fieldProps });
  });

  it('should trigger onClick', function () {
    FAQItem.should.triggerCallbackWhenClick('onClick', 'faq-title', { fieldProps, faqId: '11' }, '11');
  });

  it('should handle starred checkbox changed when toggle starred checkbox', function () {
    const onStarredToggle = spy();

    const instance = renderIntoDocument(
      <FAQItem fieldProps={ fieldProps } showStar={ true } onStarredToggle={ onStarredToggle } starred={ false }/>
    );

    const starredCheckbox = findRenderedDOMComponentWithTag(instance, 'input');

    Simulate.change(starredCheckbox);

    onStarredToggle.calledWith(true).should.be.true();
  });
});
