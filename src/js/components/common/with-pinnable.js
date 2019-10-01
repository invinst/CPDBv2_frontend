import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';


export default function withPinnable(WrappedComponent) {
  class _Base extends Component {
    constructor(props) {
      super(props);
      this.handlePinButtonClick = this.handlePinButtonClick.bind(this);
    }

    handlePinButtonClick(e) {
      e.preventDefault();
      e.stopPropagation();

      const { addOrRemoveItemInPinboard, item } = this.props;
      const { type, id, isPinned } = item;

      addOrRemoveItemInPinboard({
        type: type,
        id: String(id),
        isPinned: isPinned,
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
  };

  _Base.defaultProps = {
    addOrRemoveItemInPinboard: noop,
    item: {
      type: '',
      id: '',
      isPinned: false,
    },
  };

  return _Base;
}
