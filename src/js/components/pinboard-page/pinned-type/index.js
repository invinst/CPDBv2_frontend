import React, { Component, PropTypes } from 'react';
import { noop, omit } from 'lodash';
import cx from 'classnames';

import styles from './pinned-type.sass';
import LoadingSpinner from 'components/common/loading-spinner';
import PinnedGrid from './pinned-grid';

export default class PinnedType extends Component {
  render() {
    const { type, title, items, requesting } = this.props;
    const noItems = items.length < 1;

    if (!requesting && noItems) {
      return null;
    }
    return (
      <div className={ cx(styles.pinnedType, `test--${type}-section` ) }>
        <div className='type-title'>
          { title }
        </div>
        {
          (requesting && noItems) ?
            <LoadingSpinner className='pinned-type-loading'/>
            :
            <PinnedGrid { ...omit(this.props, ['requesting', 'title']) }/>
        }
      </div>
    );
  }
}

PinnedType.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array,
  removeItemInPinboardPage: PropTypes.func,
  completeRemoveItemFromPinboard: PropTypes.func,
  addItemInPinboardPage: PropTypes.func,
  orderPinboard: PropTypes.func,
  requesting: PropTypes.bool,
  focusItem: PropTypes.func,
};

PinnedType.defaultProps = {
  items: [],
  addItemInPinboardPage: noop,
  completeRemoveItemFromPinboard: noop,
};
