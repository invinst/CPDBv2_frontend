import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import OfficerVisualToken from 'components/visual-token/officer-visual-token';
import { wrapperStyle, lightTextStyle, boldTextStyle, visualTokenStyle } from './officer-card.style.js';
import { getThisYear } from 'utils/date';
import {
  extraInfoStyle, noBorderSectionStyle,
  sectionStyle, sustainedStyle
} from 'components/landing-page/activity-grid/officer-card.style';
import { pluralize } from 'utils/language';
import Hoverable from 'components/common/higher-order/hoverable';


export class OfficerCard extends Component {
  render() {
    const {
      officerId,
      fullName,
      visualTokenBackgroundColor,
      complaintCount,
      sustainedCount,
      birthYear,
      complaintPercentile,
      race,
      gender,
      cardStyle,
      hovering,
    } = this.props;

    const complaintString = () => {
      const complaint = `${complaintCount} ${pluralize('Complaint', complaintCount)}`;
      const sustained = `${sustainedCount} Sustained`;
      if (sustainedCount) {
        return (
          <span>
            <span>{ complaint }</span>, <span style={ sustainedStyle(hovering) }>{ sustained }</span>
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
      const age = getThisYear() - birthYear - 1;
      return `${age} year old`;
    };

    const extraInfo = () => {
      return `${ageString()} ${race} ${gender}`;
    };

    const complaintPercentileString = (hovering) => {
      if (complaintPercentile) {
        const complaintFormat = parseFloat(Math.floor(complaintPercentile));
        return (
          <p style={ lightTextStyle(hovering) }>More than { complaintFormat }% of other officers</p>
        );
      }
      return '';
    };

    return (
      <Link
        to={ `/officer/${officerId}/` }
        style={ { ...wrapperStyle(hovering), ...cardStyle } }
        className='test--officer-card'
      >
        <OfficerVisualToken
          style={ { ...visualTokenStyle, ...this.props.visualTokenStyle } }
          backgroundColor={ visualTokenBackgroundColor }
        />
        <div>
          <div style={ sectionStyle }>
            <p style={ lightTextStyle(hovering) }>Officer</p>
            <p style={ boldTextStyle(hovering) }>{ fullName }</p>
          </div>
          <div style={ sectionStyle }>
            <p style={ boldTextStyle(hovering) }>{ complaintString() }</p>
            { complaintPercentileString(hovering) }
          </div>
          <div style={ noBorderSectionStyle }>
            <p style={ extraInfoStyle(hovering) }>{ extraInfo() }</p>
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
  complaintPercentile: PropTypes.number,
  birthYear: PropTypes.number,
  race: PropTypes.string,
  gender: PropTypes.string,
  hovering: PropTypes.bool,
};

export default Hoverable(OfficerCard);
