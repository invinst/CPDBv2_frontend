import React from 'react';
import {
  renderIntoDocument, Simulate,
  findRenderedDOMComponentWithClass, scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import FAQListItem from 'components/faq-page/faq-list-item';
import RawFAQFactory from 'utils/test/factories/raw-faq';
import { unmountComponentSuppressError, withAnimationDisabled } from 'utils/test';
import FAQItemContent from 'components/faq-page/faq-item-content';


describe('FAQListItem component', function () {
  let element;
  const faq = RawFAQFactory.build();

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be renderable', function () {
    FAQListItem.should.be.renderable({ faq });
  });

  it('should expand content onClick', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(<FAQListItem faq={ faq }/>);
      scryRenderedComponentsWithType(element, FAQItemContent).length.should.equal(0);
      Simulate.click(findRenderedDOMComponentWithClass(element, 'faq-title'));
      scryRenderedComponentsWithType(element, FAQItemContent).length.should.equal(1);
      Simulate.click(findRenderedDOMComponentWithClass(element, 'faq-title'));
      scryRenderedComponentsWithType(element, FAQItemContent).length.should.equal(0);
    });
  });
});
