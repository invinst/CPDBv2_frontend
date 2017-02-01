import React from 'react';
import { spy, stub } from 'sinon';
import { findRenderedComponentWithType, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import {
  unmountComponentSuppressError, renderInDragDropContext, wrapWithContext
} from 'utils/test';
import DroppableFAQListSection, { _DroppableFAQListSection } from 'components/faq-page/droppable-faq-list-section';
import FAQListSection from 'components/faq-page/faq-list-section';
import { DragSourceFAQListItem } from 'components/faq-page/draggable-faq-list-item';

describe('DroppableFAQListSection', function () {
  let instance;

  let faqs = [
    { id: 1, fieldProps: { question: {} }, meta: { starred: false } },
    { id: 2, fieldProps: { question: {} }, meta: { starred: false } },
    { id: 3, fieldProps: { question: {} }, meta: { starred: false } }
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render FAQListSection', function () {
    instance = renderInDragDropContext(
      <DroppableFAQListSection faqs={ faqs } updateOrder={ spy() } requestFAQs={ spy() }/>
    );

    findRenderedComponentWithType(instance, FAQListSection);
  });

  it('should pass faqs from props to state', function () {
    instance = renderInDragDropContext(
      <DroppableFAQListSection faqs={ faqs } />
    );

    let droppableFaqListSection = findRenderedComponentWithType(instance, _DroppableFAQListSection);

    droppableFaqListSection.state.faqs.should.eql(faqs);
  });

  it('should call updateOrder with new order data when drop', function () {
    const updateOrder = spy();
    instance = renderInDragDropContext(wrapWithContext(
      { editModeOn: true },
      <DroppableFAQListSection faqs={ faqs } updateOrder={ updateOrder }/>
    ));

    const backend = instance.getManager().getBackend();
    const droppableFaqListSection = findRenderedComponentWithType(instance, _DroppableFAQListSection);
    const dropTarget = findRenderedComponentWithType(instance, DroppableFAQListSection);
    const dragSourceFAQListItem = scryRenderedComponentsWithType(instance, DragSourceFAQListItem)[0];
    const orderObj = {};
    stub(droppableFaqListSection, 'currentOrder', () => orderObj);

    backend.simulateBeginDrag([dragSourceFAQListItem.getHandlerId()]);
    backend.simulateHover([dropTarget.getHandlerId()]);
    backend.simulateDrop();

    droppableFaqListSection.currentOrder.called.should.be.true();
    droppableFaqListSection.currentOrder.restore();
    updateOrder.calledWith(orderObj).should.be.true();
  });

  describe('findItem', function () {
    it('should return faq and index', function () {
      faqs = [
        { id: 1, fieldProps: { question: {}, answer: {} }, meta: { order: 1, starred: false } },
        { id: 2, fieldProps: { question: {}, answer: {} }, meta: { order: 2, starred: false } },
        { id: 3, fieldProps: { question: {}, answer: {} }, meta: { order: 3, starred: false } }
      ];

      instance = renderInDragDropContext(
        <DroppableFAQListSection faqs={ faqs } />
      );

      const droppableFaqListSection = findRenderedComponentWithType(instance, _DroppableFAQListSection);

      droppableFaqListSection.findItem(2).should.eql({
        faq: { id: 2, fieldProps: { question: {}, answer: {} }, meta: { order: 2, starred: false } },
        index: 1
      });
    });
  });

  describe('moveItem', function () {
    it('should reorder faqs list', function () {
      faqs = [
        { id: 1, fieldProps: { question: {}, answer: {} }, meta: { order: 1, starred: false } },
        { id: 2, fieldProps: { question: {}, answer: {} }, meta: { order: 2, starred: false } },
        { id: 3, fieldProps: { question: {}, answer: {} }, meta: { order: 3, starred: false } }
      ];

      instance = renderInDragDropContext(
        <DroppableFAQListSection faqs={ faqs } />
      );

      const droppableFaqListSection = findRenderedComponentWithType(instance, _DroppableFAQListSection);

      droppableFaqListSection.moveItem(1, 2);

      droppableFaqListSection.state.faqs.should.eql([
        { id: 2, fieldProps: { question: {}, answer: {} }, meta: { order: 2, starred: false } },
        { id: 3, fieldProps: { question: {}, answer: {} }, meta: { order: 3, starred: false } },
        { id: 1, fieldProps: { question: {}, answer: {} }, meta: { order: 1, starred: false } }
      ]);
    });
  });

  describe('currentOrder', function () {
    it('should return order data of current faqs list and modify meta.order accordingly', function () {
      faqs = [
        { id: 1, fieldProps: { question: {}, answer: {} }, meta: { order: 1, starred: false } },
        { id: 3, fieldProps: { question: {}, answer: {} }, meta: { order: 2, starred: false } },
        { id: 2, fieldProps: { question: {}, answer: {} }, meta: { order: 3, starred: false } }
      ];

      instance = renderInDragDropContext(
        <DroppableFAQListSection faqs={ faqs } />
      );

      const droppableFaqListSection = findRenderedComponentWithType(instance, _DroppableFAQListSection);

      droppableFaqListSection.currentOrder().should.eql([
        { id: 1, meta: { order: 3 } },
        { id: 3, meta: { order: 2 } },
        { id: 2, meta: { order: 1 } }
      ]);
    });
  });
});
