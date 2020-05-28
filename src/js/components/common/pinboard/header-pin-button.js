import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { pick, noop } from 'lodash';

import PinboardsMenu from 'components/common/pinboard/pinboards-menu';
import ItemPinButton from 'components/common/item-pin-button';
import HeaderButton from 'components/headers/shareable-header/header-button';
import headerStyles from 'components/headers/shareable-header/shareable-header.sass';
import shareableHeaderStyles from 'components/headers/shareable-header/shareable-header.sass';
import pinButtonStyles from 'components/common/item-pin-button.sass';


const PINBOARDS_MENU_PROPS = [
  'pinboards', 'item', 'addOrRemoveItemInPinboard', 'createPinboard', 'fetchPinboard',
];

export default function HeaderPinButton(props) {
  const {
    isPinned,
    addOrRemoveItemInPinboard,
    item,
    showSelectPinboards,
  } = props;

  return (
    showSelectPinboards ?
      <HeaderButton
        name='add-to-pinboard-btn'
        buttonClassName={ cx(headerStyles.addToPinboardBtn, 'pinboard-feature') }
        Menu={ PinboardsMenu }
        menuProps={ pick(props, PINBOARDS_MENU_PROPS) }
      />
      :
      <ItemPinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        showHint={ false }
        className={ cx(shareableHeaderStyles.headerButton, pinButtonStyles.headerPinButton) }
        item={ { ...item, isPinned } }
      />
  );
}

HeaderPinButton.propTypes = {
  item: PropTypes.object,
  pinboards: PropTypes.array,
  isPinned: PropTypes.bool,
  showSelectPinboards: PropTypes.bool,
  addOrRemoveItemInPinboard: PropTypes.func,
  fetchPinboard: PropTypes.func,
  createPinboard: PropTypes.func,
};

HeaderPinButton.defaultProps = {
  item: {},
  pinboards: [],
  isPinned: false,
  showSelectPinboards: false,
  addOrRemoveItemInPinboard: noop,
  fetchPinboard: noop,
  createPinboard: noop,
};
