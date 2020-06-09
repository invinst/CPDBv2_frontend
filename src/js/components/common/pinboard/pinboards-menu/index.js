import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'lodash';

import styles from './pinboards-menu.sass';
import { redirectToCreatedPinboard } from 'utils/pinboard';
import PinboardMenuItem from './pinboard-menu-item';
import { PINNED_ITEM_TYPES } from 'utils/constants';


const PINBOARD_PINNED_ITEM_TYPE_MAPPING = {
  [PINNED_ITEM_TYPES.OFFICER]: 'officerIds',
  [PINNED_ITEM_TYPES.CR]: 'crids',
  [PINNED_ITEM_TYPES.TRR]: 'trrIds',
};

export default class PinboardsMenu extends Component {
  handleAddToNewPinboard = () => {
    const { createPinboard, closeMenu, item } = this.props;
    createPinboard({ [PINBOARD_PINNED_ITEM_TYPE_MAPPING[item.type]]: [item.id] }).then((response) => {
      closeMenu();
      redirectToCreatedPinboard(response);
    });
  };

  handlePinButtonClick = ({ id: pinboardId, isPinned, isCurrent }) => {
    const { addOrRemoveItemInPinboard, item, closeMenu, fetchPinboard } = this.props;
    if (isCurrent) {
      addOrRemoveItemInPinboard({ ...item, isPinned });
    } else {
      fetchPinboard(pinboardId).then(() => {
        addOrRemoveItemInPinboard({ ...item, isPinned });
      });
    }
    closeMenu();
  };

  render() {
    const { pinboards, closeMenu } = this.props;

    return (
      <div className={ styles.pinboardsMenu }>
        <div className='title'>Add to Pinboard</div>
        <div className='pinboards'>
          {
            pinboards.map((pinboard) => (
              <PinboardMenuItem
                key={ pinboard.id }
                pinboard={ pinboard }
                onClick={ this.handlePinButtonClick }
                closeMenu={ closeMenu }
              />
            ))
          }
        </div>
        <div
          className='add-to-new-pinboard'
          onClick={ this.handleAddToNewPinboard }
        >Add to a new pinboard</div>
      </div>
    );
  }
}

PinboardsMenu.propTypes = {
  item: PropTypes.object,
  pinboards: PropTypes.array,
  isShown: PropTypes.bool,
  closeMenu: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  fetchPinboard: PropTypes.func,
  createPinboard: PropTypes.func,
};

PinboardsMenu.defaultProps = {
  item: {},
  pinboards: [],
  isShown: false,
  closeMenu: noop,
  addOrRemoveItemInPinboard: noop,
  fetchPinboard: noop,
  createPinboard: noop,
};
