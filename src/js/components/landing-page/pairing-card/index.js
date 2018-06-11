import React, { Component } from 'react';

import PairingChart from 'components/landing-page/pairing-card/pairing-chart';
import {
  wrapperStyle,
  firstSectionStyle,
  secondSectionStyle,
  firstOfficerStyle,
  secondOfficerStyle
} from './pairing-card.style';
import OfficerInfo from 'components/landing-page/pairing-card/officer-info';


export default class PairingCard extends Component {
  render() {
    const firstOfficer = {
      name: 'John Hurley',
      age: 29,
      race: 'asian/pacific islander',
      gender: 'female'
    };
    const secondOfficer = {
      name: 'John Burzinski',
      age: 41,
      race: 'asian/pacific islander',
      gender: 'male'
    };

    return (
      <div style={ wrapperStyle }>
        <div style={ firstSectionStyle }>
          <PairingChart coaccused={ 10 } />
        </div>
        <div style={ secondSectionStyle }>
          <OfficerInfo
            info={ firstOfficer }
            style={ firstOfficerStyle }
          />
          <OfficerInfo
            info={ secondOfficer }
            style={ secondOfficerStyle }
          />
        </div>
      </div>
    );
  }
}
