import React, { PropTypes } from 'react';
import {
  scryRenderedComponentsWithType, scryRenderedDOMComponentsWithClass, Simulate,
  findRenderedComponentWithType, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { withAnimationDisabled, renderInDragDropContext, unmountComponentSuppressError } from 'utils/test';
import ContextWrapper from 'utils/test/components/context-wrapper';
import FAQListSection from 'components/faq-page/faq-list-section';
import DraggableFAQListItem from 'components/faq-page/draggable-faq-list-item';
import FAQListItem from 'components/faq-page/faq-list-item';
import FAQItemContent from 'components/faq-page/faq-item-content';


class FAQListSectionContextWrapper extends ContextWrapper {}
FAQListSectionContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

function createEditorStateStub(plainText) {
  return {
    value: {
      getCurrentContent: () => {
        return {
          getPlainText: () => {
            return plainText;
          }
        };
      }
    }
  };
}


describe('FAQListSection', function () {
  let instance;

  const faqs = [
    { id: 1, fieldProps: { question: {} }, meta: { order: 1, starred: false } },
    { id: 2, fieldProps: { question: {} }, meta: { order: 2, starred: false } },
    { id: 3, fieldProps: { question: {} }, meta: { order: 3, starred: false } }
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FAQListSection.should.be.renderable({ faqs: [] });
  });

  it('should render faq-list-item', function () {
    const requestFAQs = spy();
    instance = renderInDragDropContext(
      <FAQListSection faqs={ faqs } requestFAQs={ requestFAQs }/>
    );

    scryRenderedComponentsWithType(instance, DraggableFAQListItem).should.have.length(3);
    scryRenderedComponentsWithType(instance, FAQListItem).should.have.length(3);
    requestFAQs.called.should.be.true();
  });

  it('should expand children correctly without editModeOn', function () {
    const stubDispatchExpandFAQAction = stub(FAQListSection.prototype, 'dispatchExpandFAQAction');
    instance = renderInDragDropContext(
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

    stubDispatchExpandFAQAction.restore();
  });

  it('should send event to Intercom when expanding children without editModeOn', function () {
    const stubDispatchExpandFAQAction = stub(FAQListSection.prototype, 'dispatchExpandFAQAction');
    const spyExpandFAQ = spy();

    const faqs = [
      { id: 1, fieldProps: { question: {} }, meta: { order: 1, starred: false } },
      { id: 2, fieldProps: { question: {} }, meta: { order: 2, starred: false } },
      { id: 3, fieldProps: { question: {} }, meta: { order: 3, starred: false } }
    ];

    instance = renderInDragDropContext(
      <FAQListSection faqs={ faqs } expandFAQ={ spyExpandFAQ }/>
    );

    withAnimationDisabled(function () {
      const [title1, title2] = scryRenderedDOMComponentsWithClass(instance, 'faq-title');
      scryRenderedComponentsWithType(instance, FAQListItem);

      Simulate.click(title2);
      stubDispatchExpandFAQAction.calledWith(spyExpandFAQ, faqs[1]).should.equal(true);

      Simulate.click(title1);
      stubDispatchExpandFAQAction.calledWith(spyExpandFAQ, faqs[0]).should.equal(true);
    });

    stubDispatchExpandFAQAction.restore();
  });

  it('should openBottomSheetWithFAQ when click on faq-item with editModeOn', function () {
    const openBottom = spy();
    const requestFAQs = spy();

    instance = renderInDragDropContext(
      <FAQListSectionContextWrapper context={ { editModeOn: true } }>
        <FAQListSection faqs={ faqs } openBottomSheetWithFAQ={ openBottom } requestFAQs={ requestFAQs }/>
      </FAQListSectionContextWrapper>
    );

    withAnimationDisabled(function () {
      const faq = scryRenderedDOMComponentsWithClass(instance, 'faq-title')[0];

      Simulate.click(faq);
      openBottom.calledWith(faqs[0].id).should.be.true();
    });
  });

  it('should not render add-faq-btn button without editModeOn', function () {
    const faqs = [];
    const requestFAQs = spy();

    instance = renderInDragDropContext(
      <FAQListSection faqs={ faqs } requestFAQs={ requestFAQs }/>
    );

    scryRenderedDOMComponentsWithClass(instance, 'add-faq-btn').length.should.equal(0);
  });

  it('should render add-faq-btn button with editModeOn', function () {
    const faqs = [];
    const requestFAQs = spy();

    instance = renderInDragDropContext(
      <FAQListSectionContextWrapper context={ { editModeOn: true } }>
        <FAQListSection faqs={ faqs } requestFAQs={ requestFAQs }/>
      </FAQListSectionContextWrapper>
    );

    scryRenderedDOMComponentsWithClass(instance, 'add-faq-btn').length.should.equal(1);
  });

  it('should openBottomSheetToCreateFAQ when click add-faq-btn', function () {
    const faqs = [];
    const openBottom = spy();
    const requestFAQs = spy();

    instance = renderInDragDropContext(
      <FAQListSectionContextWrapper context={ { editModeOn: true } }>
        <FAQListSection faqs={ faqs } openBottomSheetToCreateFAQ={ openBottom } requestFAQs={ requestFAQs }/>
      </FAQListSectionContextWrapper>
    );

    withAnimationDisabled(function () {
      const addFAQBtn = findRenderedDOMComponentWithClass(instance, 'add-faq-btn');

      Simulate.click(addFAQBtn);

      openBottom.called.should.be.true();
    });
  });

  describe('dispatchExpandFAQAction', function () {
    it('should call Intercom tracking util', function () {
      const expandFAQ = spy();
      FAQListSection.prototype.dispatchExpandFAQAction(expandFAQ, {
        id: 9,
        fieldProps: {
          question: createEditorStateStub('q'),
          answer: createEditorStateStub('a')
        }
      });

      expandFAQ.calledWith({ id: 9, question: 'q', answer: 'a' }).should.be.true();
    });
  });
});
