import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import FAQListItem from './faq-list-item';
import { DragTypes } from 'utils/constants';

const dragSource = {
  beginDrag(props) {
    const result = {
      id: props.faqId,
      originalIndex: props.findItem(props.faqId).index
    };
    return result;
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveItem(droppedId, originalIndex);
    }
  }
};

const dropTarget = {
  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { faqId: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findItem(overId);
      props.moveItem(draggedId, overIndex);
    }
  }
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class DraggableFAQListItem extends Component {
  render() {
    const { isDragging, connectDragSource, connectDropTarget, ...rest } = this.props;
    const { editModeOn } = this.context;

    return editModeOn ?
      connectDragSource(connectDropTarget(
        <div>
          <FAQListItem isDragging={ isDragging } { ...rest }/>
        </div>
      )) :
      <FAQListItem { ...rest }/>;
  }
}

DraggableFAQListItem.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  moveItem: PropTypes.func,
  findItem: PropTypes.func
};

DraggableFAQListItem.contextTypes = {
  editModeOn: PropTypes.bool
};


export const DragSourceFAQListItem = DragSource(DragTypes.FAQ_ITEM, dragSource, dragCollect)(DraggableFAQListItem);

export default DropTarget(DragTypes.FAQ_ITEM, dropTarget, dropCollect)(DragSourceFAQListItem);
