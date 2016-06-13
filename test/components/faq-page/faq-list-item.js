import React from 'react';
import {
  renderIntoDocument, Simulate,
  findRenderedComponentWithType, findRenderedDOMComponentWithClass, scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import FAQListItem from 'components/faq-page/faq-list-item';
import FAQFactory from 'utils/test/factories/faq';
import { unmountComponentSuppressError } from 'utils/test';
import FAQItemContent from 'components/faq-page/faq-item-content';


describe('FAQListItem component', function () {
  let instance;
  const faq = FAQFactory.build();

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FAQListItem.should.be.renderable({ faq });
  });

  it('should expand content onClick', function (cb) {
    instance = renderIntoDocument(<FAQListItem faq={ faq }/>);

    const titleElement = findRenderedDOMComponentWithClass(instance, 'faq-title');

    Simulate.click(titleElement);
    findRenderedComponentWithType(instance, FAQItemContent).should.be.ok();
    Simulate.click(titleElement);

    setTimeout(function () {
      scryRenderedComponentsWithType(instance, FAQItemContent).length.should.equal(0);
      cb();
    }, 300);
  });
});
