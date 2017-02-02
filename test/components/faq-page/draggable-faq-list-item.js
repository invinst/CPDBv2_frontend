import React from 'react';
import { spy, stub } from 'sinon';
import { findRenderedComponentWithType, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError, renderInDragDropContext } from 'utils/test';
import DraggableFAQListItem, { DragSourceFAQListItem } from 'components/faq-page/draggable-faq-list-item';
import FAQListItem from 'components/faq-page/faq-list-item';

describe('DraggableFAQListItem', function () {
  let instance;

  const fieldProps = {
    'question': 'question',
    'answer': 'answer'
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render FAQListItem', function () {
    instance = renderInDragDropContext(
      <DraggableFAQListItem fieldProps={ fieldProps } isDragging={ false }/>
    );
    findRenderedComponentWithType(instance, FAQListItem);
  });

  it('should find item on begin drag', function () {
    const findItem = stub().returns({ index: 3 });
    const faqId = 1;

    instance = renderInDragDropContext(
      <DraggableFAQListItem
        fieldProps={ fieldProps } isDragging={ false } findItem={ findItem } faqId={ faqId }/>
    );

    const backend = instance.getManager().getBackend();

    const dragSourceFAQListItem = findRenderedComponentWithType(instance, DragSourceFAQListItem);
    backend.simulateBeginDrag([dragSourceFAQListItem.getHandlerId()]);

    findItem.calledWith(faqId).should.be.true();
  });

  it('should move item to original index if not hover on anything', function () {
    const moveItem = spy();

    instance = renderInDragDropContext(
      <DraggableFAQListItem
        fieldProps={ fieldProps } isDragging={ false } findItem={ () => ({ index: 0 }) }
        moveItem={ moveItem } faqId={ 1 }/>
    );

    const backend = instance.getManager().getBackend();
    const dragSourceFAQListItem = scryRenderedComponentsWithType(instance, DragSourceFAQListItem)[0];

    backend.simulateBeginDrag([dragSourceFAQListItem.getHandlerId()]);
    backend.simulateEndDrag();

    moveItem.calledWith(1, 0).should.be.true();
  });

  it('should move item to new index if hover on a drop target', function () {
    const moveItem = spy();
    const findItem1 = stub().returns({ index: 0 });
    const findItem2 = stub().returns({ index: 1 });

    instance = renderInDragDropContext(
      <div>
        <DraggableFAQListItem
          fieldProps={ fieldProps } isDragging={ false } findItem={ findItem1 }
          moveItem={ moveItem } faqId={ 1 }/>
        <DraggableFAQListItem
          fieldProps={ fieldProps } isDragging={ false } findItem={ findItem2 }
          moveItem={ moveItem } faqId={ 2 }/>
      </div>
    );

    const backend = instance.getManager().getBackend();
    const dragSourceFAQListItem = scryRenderedComponentsWithType(instance, DragSourceFAQListItem)[0];
    const dropTargetFAQListItem = scryRenderedComponentsWithType(instance, DraggableFAQListItem)[1];

    backend.simulateBeginDrag([dragSourceFAQListItem.getHandlerId()]);
    backend.simulateHover([dropTargetFAQListItem.getHandlerId()]);

    moveItem.calledWith(1, 1).should.be.true();

    backend.simulateDrop();
    backend.simulateEndDrag();

    findItem1.called.should.be.true();
    moveItem.calledOnce.should.be.true();
  });
});
