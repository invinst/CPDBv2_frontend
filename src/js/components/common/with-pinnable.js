import React, { Component, PropTypes } from 'react';
import { noop, every, isEmpty } from 'lodash';
import { PINNED_ITEM_TYPES } from 'utils/constants';


export default function withPinnable(WrappedComponent) {
  class _Base extends Component {
    constructor(props) {
      super(props);
      this.handlePinButtonClick = this.handlePinButtonClick.bind(this);
    }

    handlePinButtonClick(e) {
      e.preventDefault();
      e.stopPropagation();

      const { addOrRemoveItemInPinboard, items, item } = this.props;
      const addOrRemoveItems = isEmpty(items) ? [item] : items;
      const allIsPinned = every(addOrRemoveItems, item => item.isPinned);

      addOrRemoveItems.forEach(item => {
        if (item.isPinned === allIsPinned)
          addOrRemoveItemInPinboard({
            type: item.type,
            id: item.type === PINNED_ITEM_TYPES.CR ? String(item.id) : item.id,
            isPinned: item.isPinned,
          });
      });
    }

    render() {
      return (
        <span onClick={ this.handlePinButtonClick }>
          <WrappedComponent { ...this.props } />
        </span>
      );
    }
  }

  _Base.propTypes = {
    addOrRemoveItemInPinboard: PropTypes.func,
    item: PropTypes.object,
    items: PropTypes.array,
  };

  _Base.defaultProps = {
    addOrRemoveItemInPinboard: noop,
    item: {
      type: '',
      id: '',
      isPinned: false,
    },
    items: [],
  };

  return _Base;
}
