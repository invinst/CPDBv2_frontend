import PropTypes from 'prop-types';
// import React from 'react';
import { noop } from 'lodash';

import withPinnable from 'components/common/with-pinnable';

function PinButton(props) {
  const { item } = props;
  const { isPinned } = item;
  // const pinButtonText = isPinned ? 'Remove from pinboard' : 'Add to pinboard';

  return (null);
  // (
  //   <button className={ `pinboard-feature ${className}` }>
  //     { pinButtonText }
  //   </button>
  // );
}

PinButton.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.number,
    isPinned: PropTypes.bool,
  }),
  addOrRemoveItemInPinboard: PropTypes.func,
  className: PropTypes.string,
};

PinButton.defaultProps = {
  item: {
    type: '',
    id: 123456,
    isPinned: '',
  },
  addOrRemoveItemInPinboard: noop,
  className: '',
};

export default withPinnable(PinButton);
