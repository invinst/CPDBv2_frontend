import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { map } from 'lodash';

import {
  wrapperStyle,
  titleStyle,
  listStyle,
  listItemStyle,
  itemKeyStyle,
} from './officer-info-widget.style';


export default class OfficerInfoWidget extends Component {
  render() {
    const {
      fullName,
      birthYear,
      race,
      gender,
      badge,
      rank,
      unit,
      appointedDate,
      resignationDate,
    } = this.props;
    const age = (new Date()).getFullYear() - birthYear;
    const appointedDateString = appointedDate.format('ll').toUpperCase();
    const resignationDateString = resignationDate ?
      resignationDate.format('ll').toUpperCase() : 'Present';

    const listInfo = {
      '': `${age} year old (b. ${birthYear}), ${race}, ${gender}.`,
      'Badge': badge,
      'Rank': rank,
      'Unit': unit,
      'Career': `${appointedDateString} — ${resignationDateString}`,
    };

    return (
      <div style={ wrapperStyle }>
        <h1 style={ titleStyle }>{ fullName }</h1>
        <ul style={ listStyle }>
          {
            map(listInfo, (metricValue, metricKey) => (
              <li style={ listItemStyle } key={ `item-${metricKey}` }>
                { metricKey && <span style={ itemKeyStyle }>{ metricKey }</span> }
                <span>{ metricValue }</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

OfficerInfoWidget.defaultProps = {
  race: 'white',
  gender: 'male',
  badge: 0,
  rank: 'Police Officer',
  unit: '',
  appointedDate: null,
  resignationDate: null,
};

OfficerInfoWidget.propTypes = {
  fullName: PropTypes.string.isRequired,
  birthYear: PropTypes.number.isRequired,
  race: PropTypes.string,
  gender: PropTypes.string,
  badge: PropTypes.number,
  rank: PropTypes.string,
  unit: PropTypes.string,
  appointedDate: PropTypes.instanceOf(moment).isRequired,
  resignationDate: PropTypes.instanceOf(moment),
};
