import React, { PropTypes } from 'react';

import SuggestionItemBase from './base';
import ItemPinButton from './item-pin-button';


class TRRItem extends SuggestionItemBase {
  renderItemPinButton() {
    const { suggestion, addOrRemoveItemInPinboard } = this.props;
    return (
      <ItemPinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        suggestion={ suggestion }
      />
    );
  }
}

TRRItem.propTypes = {
  suggestion: PropTypes.shape({
    subText: PropTypes.string,
  }),
  addOrRemoveItemInPinboard: PropTypes.func,
};

TRRItem.defaultProps = {
  suggestion: {},
};

export default TRRItem;
