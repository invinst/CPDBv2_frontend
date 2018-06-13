import React, { Component, PropTypes } from 'react';

import PairingChart from 'components/landing-page/activity-grid/pairing-card/pairing-chart';
import {
  wrapperStyle,
  firstSectionStyle,
  secondSectionStyle,
  firstOfficerStyle,
  secondOfficerStyle
} from './pairing-card.style';
import OfficerInfo from 'components/landing-page/activity-grid/pairing-card/officer-info';


export default class PairingCard extends Component {
  render() {
    const { officer1, officer2 } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ firstSectionStyle }>
          <PairingChart coaccused={ 10 } />
        </div>
        <div style={ secondSectionStyle }>
          <OfficerInfo
            info={ officer1 }
            style={ firstOfficerStyle }
          />
          <OfficerInfo
            info={ officer2 }
            style={ secondOfficerStyle }
          />
        </div>
      </div>
    );
  }
}

PairingCard.propTypes = {
  officer1: PropTypes.object,
  officer2: PropTypes.object,
};
