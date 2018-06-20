import React, { Component, PropTypes } from 'react';

import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart/index';
import {
  wrapperStyle,
  secondSectionStyle,
  firstOfficerStyle,
  secondOfficerStyle
} from './pairing-card.style';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';


export default class PairingCard extends Component {
  render() {
    const { officer1, officer2, coaccusalCount, openOfficerPage } = this.props;

    return (
      <div style={ wrapperStyle }>
        <PairingChart
          coaccusalCount={ coaccusalCount }
          background1={ officer1.backgroundColor }
          background2={ officer2.backgroundColor }
        />
        <div style={ secondSectionStyle }>
          <OfficerInfo
            info={ officer1 }
            style={ firstOfficerStyle }
            openOfficerPage={ openOfficerPage }
          />
          <OfficerInfo
            info={ officer2 }
            style={ secondOfficerStyle }
            openOfficerPage={ openOfficerPage }
          />
        </div>
      </div>
    );
  }
}

PairingCard.propTypes = {
  officer1: PropTypes.object,
  officer2: PropTypes.object,
  coaccusalCount: PropTypes.number,
  openOfficerPage: PropTypes.func,
};

PairingCard.defaultProps = {
  openOfficerPage: () => {},
};
