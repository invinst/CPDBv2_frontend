import { each, max, map } from 'lodash';

import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import FAQListSection from './faq-list-section';
import { DragTypes } from 'utils/constants';
import { moveFromIndexToIndex } from 'utils/collection';


const target = {
  drop(props, monitor, component) {
    const { updateOrder } = props;
    updateOrder(component.currentOrder());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export class _DroppableFAQListSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      faqs: props.faqs.slice(0)
    };

    this.moveItem = this.moveItem.bind(this);
    this.findItem = this.findItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore next */
    this.setState({ faqs: nextProps.faqs });
  }

  currentOrder() {
    const faqs = map(this.state.faqs, faq => ({ id: faq.id, meta: { order: faq.meta.order } }));
    let order = max(map(faqs, faq => faq.meta.order));

    each(faqs, faq => {
      faq.meta.order = order;
      order -= 1;
    });

    return faqs;
  }

  moveItem(id, atIndex) {
    const { index } = this.findItem(id);
    let { faqs } = this.state;

    this.toId = faqs[atIndex].id;
    this.fromId = id;
    faqs = moveFromIndexToIndex(faqs, index, atIndex);
    this.setState({ faqs });
  }

  findItem(id) {
    const { faqs } = this.state;
    const faq = faqs.filter(faq => faq.id === id)[0];

    return {
      faq,
      index: faqs.indexOf(faq)
    };
  }

  render() {
    const { connectDropTarget, ...rest } = this.props;
    const { faqs } = this.state;
    const { editModeOn } = this.context;
    delete rest.faqs;

    return editModeOn ?
      connectDropTarget(
        <div>
          <FAQListSection { ...rest }
            faqs={ faqs }
            moveItem={ this.moveItem }
            findItem={ this.findItem }/>
        </div>
      ) :
      <FAQListSection { ...rest } faqs={ faqs }/>;
  }
}

_DroppableFAQListSection.propTypes = {
  connectDropTarget: PropTypes.func,
  updateOrder: PropTypes.func,
  faqs: PropTypes.array
};

_DroppableFAQListSection.defaultProps = {
  connectDropTarget: () => {},
  updateOrder: () => {}
};

_DroppableFAQListSection.contextTypes = {
  editModeOn: PropTypes.bool
};

export default DropTarget(DragTypes.FAQ_ITEM, target, collect)(_DroppableFAQListSection);
