import React, { Component, PropTypes } from 'react';
import { map, differenceBy, first, get } from 'lodash';
import cx from 'classnames';

import OfficerCard from './cards/officer-card';
import CRCard from './cards/cr-card';
import TRRCard from './cards/trr-card';
import styles from './pinned-type.sass';

const CARD_MAP = {
  'OFFICER': OfficerCard,
  'CR': CRCard,
  'TRR': TRRCard,
};

export default class PinnedType extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.items.length > 0
      && this.props.items.length > 0
      && nextProps.items.length > this.props.items.length
    ) {
      this.addedItem = first(differenceBy(nextProps.items, this.props.items, 'id'));
    }
  }

  render() {
    const { type, title, items, removeItemInPinboardPage } = this.props;
    const Card = CARD_MAP[type];

    return (
      <div className={ cx(styles.wrapper, `test--${type}-section` ) }>
        <div className='type-title'>
          { title }
        </div>
        <div className='type-cards'>
          {
            map(items, item => (
              <Card
                key={ item.id } item={ item }
                removeItemInPinboardPage={ removeItemInPinboardPage }
                isAdded={ get(this.addedItem, 'id') === get(item, 'id') }
              />
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
};
