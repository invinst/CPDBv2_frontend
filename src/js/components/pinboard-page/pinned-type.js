import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
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
                removeItemInPinboardPage={ removeItemInPinboardPage }/>
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
