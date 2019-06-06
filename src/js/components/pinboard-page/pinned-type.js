import React, { Component, PropTypes } from 'react';
import { map, differenceBy, first, get, isEqual } from 'lodash';
import cx from 'classnames';
import { Muuri } from 'utils/vendors';

import { OfficerCardWithUndo as OfficerCard } from './cards/officer-card';
import { CRCardWithUndo as CRCard } from './cards/cr-card';
import { TRRCardWithUndo as TRRCard } from './cards/trr-card';
import styles from './pinned-type.sass';


const CARD_MAP = {
  'OFFICER': OfficerCard,
  'CR': CRCard,
  'TRR': TRRCard,
};

export default class PinnedType extends Component {
  constructor(props) {
    super(props);

    this.updateOrder = this.updateOrder.bind(this);
    this.removeItemInPinboardPage = this.removeItemInPinboardPage.bind(this);
  }

  componentDidMount() {
    this.initGrid();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.items.length > 0
      && this.props.items.length > 0
      && nextProps.items.length > this.props.items.length
    ) {
      this.addedItem = first(differenceBy(nextProps.items, this.props.items, 'id'));
    }
  }

  componentDidUpdate() {
    this.gridMuuri && this.gridMuuri.destroy();
    this.initGrid();
  }

  initGrid() {
    if (this.grid) {
      this.gridMuuri = new Muuri(this.grid, {
        itemClass: 'pinned-grid-item',
        dragEnabled: true,
      });

      this.gridMuuri.on('dragEnd', this.updateOrder);
    }
  }

  updateOrder() {
    const { orderPinboard, type, items } = this.props;
    const newIds = this.gridMuuri.getItems().map(item => item.getElement().getAttribute('data-id'));

    const currentIds = map(items, item => item.id);

    if (!isEqual(newIds, currentIds)) {
      orderPinboard({ type, ids: newIds });
    }
  }

  removeItemInPinboardPage(item) {
    this.gridMuuri.remove(this.itemElements[item.id]);

    setTimeout(
      () => this.props.removeItemInPinboardPage(item),
      200
    );
  }

  render() {
    const { type, title, items, focusItem } = this.props;

    if (items.length < 1) {
      return null;
    }

    const Card = CARD_MAP[type];
    this.itemElements = {};

    return (
      <div className={ cx(styles.wrapper, `test--${type}-section` ) }>
        <div className='type-title'>
          { title }
        </div>
        <div className='type-cards' ref={ grid => this.grid = grid }>
          {
            map(items, item => (
              <div
                key={ item.id }
                className='pinned-grid-item'
                data-id={ item.id }
                ref={ element => this.itemElements[item.id] = element }
              >
                <div className='item-content'>
                  <Card
                    item={ item }
                    removeItemInPinboardPage={ this.removeItemInPinboardPage }
                    isAdded={ get(this.addedItem, 'id') === get(item, 'id') }
                    focusItem={ focusItem }
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

PinnedType.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array,
  removeItemInPinboardPage: PropTypes.func,
  orderPinboard: PropTypes.func,
  focusItem: PropTypes.func,
};

PinnedType.defaultProps = {
  items: []
};
