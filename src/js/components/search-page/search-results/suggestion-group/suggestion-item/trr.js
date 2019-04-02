import React, { PropTypes } from 'react';

import SuggestionItemBase from './base';
import ItemPinButton from './item-pin-button';


class TRRItem extends SuggestionItemBase {
  renderItemPinButton() {
    const { suggestion, addItemToPinboard } = this.props;
    return (
      <ItemPinButton
        addItemToPinboard={ addItemToPinboard }
        suggestion={ suggestion }
      />
    );
  }
}

TRRItem.propTypes = {
  suggestion: PropTypes.shape({
    subText: PropTypes.string,
  }),
  addItemToPinboard: PropTypes.func,
};

TRRItem.defaultProps = {
  suggestion: {},
};

export default TRRItem;
