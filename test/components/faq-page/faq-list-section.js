import React, { PropTypes } from 'react';
import {
  renderIntoDocument, scryRenderedComponentsWithType, scryRenderedDOMComponentsWithClass, Simulate,
  findRenderedComponentWithType, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { withAnimationDisabled } from 'utils/test';
import ContextWrapper from 'utils/test/components/context-wrapper';
import FAQListSection from 'components/faq-page/faq-list-section';
import FAQListItem from 'components/faq-page/faq-list-item';
import FAQFactory from 'utils/test/factories/faq';
import { unmountComponentSuppressError } from 'utils/test';
import FAQItemContent from 'components/faq-page/faq-item-content';
import * as IntercomUtil from 'utils/intercom';


class FAQListSectionContextWrapper extends ContextWrapper {}
FAQListSectionContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

describe('FAQListSection', function () {
  let instance, stubTrackClickedFaqItem;

  beforeEach(function () {
    stubTrackClickedFaqItem = stub(IntercomUtil, 'trackClickedFaqItem');
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    stubTrackClickedFaqItem.restore();
  });

  it('should be renderable', function () {
    FAQListSection.should.be.renderable({ faqs: [] });
  });

  it('should render faq-list-item', function () {
    const faqs = FAQFactory.buildList(3);

    instance = renderIntoDocument(
      <FAQListSection faqs={ faqs }/>
    );

    scryRenderedComponentsWithType(instance, FAQListItem).should.have.length(3);
  });

  it('should expand children correctly without editModeOn', function () {
    const faqs = [{
      id: 1,
      question: 'a',
      answer: ['b']
    }, {
      id: 2,
      question: 'c',
      answer: ['d']
    }, {
      id: 3,
      question: 'e',
      answer: ['f']
    }];

    instance = renderIntoDocument(
      <FAQListSection faqs={ faqs }/>
    );

    withAnimationDisabled(function () {
      const [title1, title2] = scryRenderedDOMComponentsWithClass(instance, 'faq-title');
      let itemContents = scryRenderedComponentsWithType(instance, FAQListItem);

      Simulate.click(title2);

      scryRenderedComponentsWithType(itemContents[0], FAQItemContent).length.should.equal(0);
      findRenderedComponentWithType(itemContents[1], FAQItemContent).should.be.ok();
      scryRenderedComponentsWithType(itemContents[2], FAQItemContent).length.should.equal(0);

      Simulate.click(title1);

      findRenderedComponentWithType(itemContents[0], FAQItemContent).should.be.ok();
      scryRenderedComponentsWithType(itemContents[1], FAQItemContent).length.should.equal(0);
      scryRenderedComponentsWithType(itemContents[2], FAQItemContent).length.should.equal(0);
    });
  });

  it('should send event to Intercom when expanding children without editModeOn', function () {
    const faqs = [{
      id: 1,
      question: 'a',
      answer: ['b']
    }, {
      id: 2,
      question: 'c',
      answer: ['d']
    }, {
      id: 3,
      question: 'e',
      answer: ['f']
    }];

    instance = renderIntoDocument(
      <FAQListSection faqs={ faqs }/>
    );

    withAnimationDisabled(function () {
      const [title1, title2] = scryRenderedDOMComponentsWithClass(instance, 'faq-title');
      scryRenderedComponentsWithType(instance, FAQListItem);

      Simulate.click(title2);
      stubTrackClickedFaqItem.calledWith(2, 'c', ['d']).should.equal(true);

      Simulate.click(title1);
      stubTrackClickedFaqItem.calledWith(1, 'a', ['b']).should.equal(true);
    });
  });

  it('should openBottomSheetWithFAQ when click on faq-item with editModeOn', function () {
    const faqs = FAQFactory.buildList(1);
    const openBottom = spy();

    instance = renderIntoDocument(
      <FAQListSectionContextWrapper context={ { editModeOn: true } }>
        <FAQListSection faqs={ faqs } openBottomSheetWithFAQ={ openBottom } />
      </FAQListSectionContextWrapper>
    );

    withAnimationDisabled(function () {
      const faq = findRenderedDOMComponentWithClass(instance, 'faq-title');

      Simulate.click(faq);
      openBottom.calledWith(faqs[0].id).should.be.true();
    });
  });

  it('should not render add-faq-btn button without editModeOn', function () {
    const faqs = [];

    instance = renderIntoDocument(
      <FAQListSection faqs={ faqs }/>
    );

    scryRenderedDOMComponentsWithClass(instance, 'add-faq-btn').length.should.equal(0);
  });

  it('should render add-faq-btn button with editModeOn', function () {
    const faqs = [];

    instance = renderIntoDocument(
      <FAQListSectionContextWrapper context={ { editModeOn: true } }>
        <FAQListSection faqs={ faqs } />
      </FAQListSectionContextWrapper>
    );

    scryRenderedDOMComponentsWithClass(instance, 'add-faq-btn').length.should.equal(1);
  });

  it('should openBottomSheetToCreateFAQ when click add-faq-btn', function () {
    const faqs = [];
    const openBottom = spy();

    instance = renderIntoDocument(
      <FAQListSectionContextWrapper context={ { editModeOn: true } }>
        <FAQListSection faqs={ faqs } openBottomSheetToCreateFAQ={ openBottom } />
      </FAQListSectionContextWrapper>
    );

    withAnimationDisabled(function () {
      const addFAQBtn = findRenderedDOMComponentWithClass(instance, 'add-faq-btn');

      Simulate.click(addFAQBtn);

      openBottom.called.should.be.true();
    });
  });
});
