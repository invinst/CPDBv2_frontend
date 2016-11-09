import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';

import FAQItemContent from 'components/faq-page/faq-item-content';
import { unmountComponentSuppressError } from 'utils/test';

describe('FAQItemContent component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FAQItemContent.should.be.renderable({ faq: { answer: [] } });
  });

  it('should render correct number of paragraphs', function () {
    instance = renderIntoDocument(
      <FAQItemContent faq={ { answer: [1, 2] } }/>
    );

    const paragraphs = scryRenderedDOMComponentsWithTag(instance, 'p');

    paragraphs.should.have.length(2);
  });
});
