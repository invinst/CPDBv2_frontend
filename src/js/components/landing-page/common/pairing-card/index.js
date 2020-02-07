import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart';
import style from './pairing-card.sass';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';


export default class PairingCard extends Component {
  render() {
    const { officer1, officer2, coaccusalCount, addOrRemoveItemInPinboard } = this.props;

    return (
      <div className={ style.pairingCard }>
        <ItemPinButton
          className={ pinButtonStyles.cardPinnedButton }
          addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
          showHint={ false }
          items={ [{
            type: PINNED_ITEM_TYPES.OFFICER,
            ...officer1,
          }, {
            type: PINNED_ITEM_TYPES.OFFICER,
            ...officer2,
          }] }
        />
        <Link
          to={ `/officer/${officer1.id}/` }
          className='half-pane officer-info-left-hover-sibling'
        />
        <Link
          to={ `/officer/${officer2.id}/` }
          className='half-pane officer-info-right-hover-sibling'
        />
        <div className='pairing-card-content'>
          <PairingChart
            coaccusalCount={ coaccusalCount }
            background1={ officer1.backgroundColor }
            background2={ officer2.backgroundColor }
          />
          <div className='second-section'>
            <OfficerInfo info={ officer1 }/>
            <OfficerInfo rightOfficer={ true } info={ officer2 }/>
          </div>
        </div>
      </div>
    );
  }
}

PairingCard.propTypes = {
  officer1: PropTypes.object,
  officer2: PropTypes.object,
  coaccusalCount: PropTypes.number,
  addOrRemoveItemInPinboard: PropTypes.func,
};
