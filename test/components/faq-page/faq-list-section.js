import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import FAQListSection from 'components/faq-page/faq-list-section';
import FAQListItem from 'components/faq-page/faq-list-item';
import FAQFactory from 'utils/test/factories/faq';
import { unmountComponentSuppressError } from 'utils/test';


describe('FAQListSection', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FAQListSection.should.be.renderable({ faqs: [] });
  });

  it('should render faq-list-item', function () {
    const faqs = FAQFactory.buildList(3);

    instance = renderIntoDocument(
      <FAQListSection faqs={ faqs }/>
    );

    scryRenderedComponentsWithType(instance, FAQListItem).length.should.equal(3);
  });
});
