import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import OfficerVisualToken from 'components/visual-token/officer-visual-token';
import { wrapperStyle, lightTextStyle, boldTextStyle, visualTokenStyle } from './officer-card.style.js';
import { CURRENT_YEAR } from 'utils/constants';
import {
  extraInfoStyle, noBorderSectionStyle,
  sectionStyle, sustainedStyle
} from 'components/landing-page/activity-grid/officer-card.style';


export default class OfficerCard extends Component {
  render() {
    const {
      officerId,
      fullName,
      visualTokenBackgroundColor,
      complaintCount,
      sustainedCount,
      complaintRate,
      birthYear,
      race,
      gender,
      cardStyle,
    } = this.props;

    const complaintString = () => {
      const complaint = `${complaintCount} Complaint${complaintCount !== 1 ? 's' : ''}`;
      const sustained = `${sustainedCount} Sustained`;
      if (sustainedCount) {
        return (
          <span>
            <span>{ complaint }</span>, <span style={ sustainedStyle }>{ sustained }</span>
          </span>
        );
      }
      else {
        return complaint;
      }
    };

    const ageString = () => {
      if (!birthYear) {
        return '';
      }
      const age = CURRENT_YEAR - birthYear;
      return `${age - 1}/${age} years old, `;
    };

    const extraInfo = () => {
      return `${ageString()}${race}, ${gender}.`;
    };

    return (
      <Link
        to={ `/officer/${officerId}/` }
        style={ { ...wrapperStyle, ...cardStyle } }
        className='test--activity-grid-section-card'
      >
        <OfficerVisualToken
          style={ { ...visualTokenStyle, ...this.props.visualTokenStyle } }
          officerId={ officerId }
          backgroundColor={ visualTokenBackgroundColor }
        />
        <div>
          <div style={ sectionStyle }>
            <p style={ lightTextStyle }>Officer</p>
            <p style={ boldTextStyle }>{ fullName }</p>
          </div>
          <div style={ sectionStyle }>
            <p style={ boldTextStyle }>{ complaintString() }</p>
            <p style={ lightTextStyle }>Less than { complaintRate }% of other officers</p>
          </div>
          <div style={ noBorderSectionStyle }>
            <p style={ extraInfoStyle }>{ extraInfo() }</p>
          </div>
        </div>
      </Link>
    );
  }
}

OfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  visualTokenBackgroundColor: PropTypes.string,
  cardStyle: PropTypes.object,
  visualTokenStyle: PropTypes.object,
  complaintCount: PropTypes.number,
  sustainedCount: PropTypes.number,
  complaintRate: PropTypes.number,
  birthYear: PropTypes.number,
  race: PropTypes.string,
  gender: PropTypes.string,
};
