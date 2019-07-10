import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';

import withPinnable from 'components/common/with-pinnable';

class PinButton extends Component {
  render() {
    const { item, className } = this.props;
    const { isPinned } = item;
    const pinButtonText = isPinned ? 'Remove from pinboard' : 'Add to pinboard';

    return (
      <button className={ className }>
        { pinButtonText }
      </button>
    );
  }
}

PinButton.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    isPinned: PropTypes.bool,
  }),
  addOrRemoveItemInPinboard: PropTypes.func,
  className: PropTypes.string,
};

PinButton.defaultProps = {
  item: {
    type: '',
    id: '',
    isPinned: '',
  },
  addOrRemoveItemInPinboard: noop,
  className: '',
};

export default withPinnable(PinButton);
