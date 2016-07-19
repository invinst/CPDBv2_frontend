import React from 'react';
import {
  renderIntoDocument, scryRenderedComponentsWithType, scryRenderedDOMComponentsWithClass, Simulate,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import FAQListSection from 'components/faq-page/faq-list-section';
import FAQListItem from 'components/faq-page/faq-list-item';
import FAQFactory from 'utils/test/factories/raw-faq';
import { unmountComponentSuppressError } from 'utils/test';
import FAQItemContent from 'components/faq-page/faq-item-content';


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

  it('should expand children correctly', function (done) {
    const faqs = FAQFactory.buildList(3);

    instance = renderIntoDocument(
      <FAQListSection faqs={ faqs }/>
    );

    const [title1, title2] = scryRenderedDOMComponentsWithClass(instance, 'faq-title');
    let itemContents = scryRenderedComponentsWithType(instance, FAQListItem);

    Simulate.click(title2);

    scryRenderedComponentsWithType(itemContents[0], FAQItemContent).length.should.equal(0);
    findRenderedComponentWithType(itemContents[1], FAQItemContent).should.be.ok();
    scryRenderedComponentsWithType(itemContents[2], FAQItemContent).length.should.equal(0);

    Simulate.click(title1);
    setTimeout(function () {
      findRenderedComponentWithType(itemContents[0], FAQItemContent).should.be.ok();
      scryRenderedComponentsWithType(itemContents[1], FAQItemContent).length.should.equal(0);
      scryRenderedComponentsWithType(itemContents[2], FAQItemContent).length.should.equal(0);
      done();
    }, 300);
  });
});
