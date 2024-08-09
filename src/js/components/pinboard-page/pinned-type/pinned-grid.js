import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { map, isEqual, find, noop } from 'lodash';
import { Muuri } from 'utils/vendors';

import { OfficerCardWithUndo as OfficerCard } from 'components/pinboard-page/cards/officer-card';
import { CRCardWithUndo as CRCard } from 'components/pinboard-page/cards/cr-card';
import { TRRCardWithUndo as TRRCard } from 'components/pinboard-page/cards/trr-card';
import { getPageYBottomOffset, scrollByBottomOffset } from 'utils/navigation';
import styles from './pinned-grid.sass';


const CARD_MAP = {
  'OFFICER': OfficerCard,
  'CR': CRCard,
  'TRR': TRRCard,
};

export default class PinnedGrid extends Component {
  constructor(props) {
    super(props);

    this.rendered = false;
  }

  componentDidMount() {
    this.initGrid();
  }

  componentDidUpdate(prevProps) {
    const bottomOffset = this.rendered ? getPageYBottomOffset() : null;
    this.rendered = true;
    const { items } = this.props;
    items.forEach(item => {
      if (!find(prevProps.items, { id: item.id })) {
        this.gridMuuri.add(this.itemElements[item.id]);
      }
    });

    bottomOffset && scrollByBottomOffset(bottomOffset);
  }

  componentWillUnmount() {
    this.gridMuuri.destroy();
  }

  initGrid() {
    this.gridMuuri = new Muuri(this.grid, {
      itemClass: 'pinned-grid-item',
      dragEnabled: true,
    });

    this.gridMuuri.on('dragEnd', this.updateOrder);
  }

  updateOrder = () => {
    const { orderPinboard, type, items } = this.props;
    const newIds = this.gridMuuri.getItems().map(item => item.getElement().getAttribute('data-id'));
    const currentIds = map(items, item => item.id);

    if (!isEqual(newIds, currentIds)) {
      orderPinboard({ type, ids: newIds });
    }
  };

  removeItemInPinboardPage = item => {
    setTimeout(
      () => this.props.removeItemInPinboardPage(item),
      200
    );
  };

  completeRemoveItemInPinboardPage = item => {
    const { completeRemoveItemFromPinboard } = this.props;

    this.gridMuuri.remove(this.itemElements[item.id]);
    completeRemoveItemFromPinboard(item);
  };

  render() {
    const { type, items, focusItem, addItemInPinboardPage } = this.props;
    const Card = CARD_MAP[type];
    this.itemElements = {};

    return (null); 
    // (
    //   <div className={ styles.pinnedGrid } ref={ grid => this.grid = grid }>
    //     {
    //       map(items, item => (
    //         <div
    //           key={ item.id }
    //           className='pinned-grid-item'
    //           data-id={ item.id }
    //           ref={ element => this.itemElements[item.id] = element }
    //         >
    //           <div className='item-content'>
    //             <Card
    //               item={ item }
    //               removeItemInPinboardPage={ this.removeItemInPinboardPage }
    //               completeRemoveItemInPinboardPage={ this.completeRemoveItemInPinboardPage }
    //               addItemInPinboardPage={ addItemInPinboardPage }
    //               focusItem={ focusItem }
    //             />
    //           </div>
    //         </div>
    //       ))
    //     }
    //   </div>
    // );
  }
}

PinnedGrid.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  removeItemInPinboardPage: PropTypes.func,
  completeRemoveItemFromPinboard: PropTypes.func,
  addItemInPinboardPage: PropTypes.func,
  orderPinboard: PropTypes.func,
  focusItem: PropTypes.func,
};

PinnedGrid.defaultProps = {
  addItemInPinboardPage: noop,
  completeRemoveItemFromPinboard: noop,
};
