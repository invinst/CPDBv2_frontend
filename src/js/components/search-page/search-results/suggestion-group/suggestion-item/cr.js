import React, { PropTypes } from 'react';

import cx from 'classnames';

import SuggestionItemBase from './base';
import ItemPinButton from './item-pin-button';
import styles from './cr.sass';


class CRItem extends SuggestionItemBase {
  renderItemPinButton() {
    const { suggestion, addOrRemoveItemInPinboard } = this.props;
    return (
      <ItemPinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        suggestion={ suggestion }
      />
    );
  }

  renderSecondRow() {
    const { subText } = this.props.suggestion;

    if (subText === undefined) {
      return null;
    }

    return (
      <div className={ cx('test--second-row', styles.grayText) } dangerouslySetInnerHTML={ { __html: subText } }/>
    );
  }
}

CRItem.propTypes = {
  suggestion: PropTypes.shape({
    subText: PropTypes.string,
  }),
  addOrRemoveItemInPinboard: PropTypes.func,
};

CRItem.defaultProps = {
  suggestion: {},
};

export default CRItem;
