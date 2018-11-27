import React, { Component, PropTypes } from 'react';

import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart';
import style from './pairing-card.sass';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';
import HalfPane from './half-pane';


export default class PairingCard extends Component {
  render() {
    const { officer1, officer2, coaccusalCount } = this.props;

    return (
      <div className={ style.pairingCard }>
        <HalfPane
          className='officer-info-left-hover-sibling'
          officerId={ officer1.id }
        />
        <HalfPane
          className='officer-info-right-hover-sibling'
          rightHalf={ true }
          officerId={ officer2.id }
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
};
