import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import OfficerVisualToken from 'components/visual-token/officer-visual-token';
import { wrapperStyle, officerTextStyle, fullNameTextStyle } from './officer-card.style.js';


export default class OfficerCard extends Component {
  render() {
    const { officerId, fullName, visualTokenBackgroundColor } = this.props;
    return (
      <Link to={ `/officer/${officerId}/` } style={ wrapperStyle }>
        <OfficerVisualToken
          width={ 216 }
          height={ 216 }
          officerId={ officerId }
          backgroundColor={ visualTokenBackgroundColor }/>
        <p style={ officerTextStyle }>Officer</p>
        <p style={ fullNameTextStyle }>{ fullName }</p>
      </Link>
    );
  }
}

OfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  visualTokenBackgroundColor: PropTypes.string
};
