import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop, every, isEmpty } from 'lodash';

export default function withPinnable(WrappedComponent) {
  class _Base extends Component {
    handlePinButtonClick = e => {
      e.preventDefault();
      e.stopPropagation();

      const { addOrRemoveItemInPinboard, items, item } = this.props;
      const addOrRemoveItems = isEmpty(items) ? [item] : items;
      const allIsPinned = every(addOrRemoveItems, item => item.isPinned);

      addOrRemoveItems.forEach(addOrRemoveItem => {
        if (addOrRemoveItem.isPinned === allIsPinned)
          addOrRemoveItemInPinboard({
            type: addOrRemoveItem.type,
            id: addOrRemoveItem.id,
            isPinned: addOrRemoveItem.isPinned,
          });
      });
    };

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
