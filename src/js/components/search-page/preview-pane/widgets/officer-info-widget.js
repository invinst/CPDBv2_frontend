import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import {
  wrapperStyle,
  titleStyle,
  listStyle,
  listItemStyle,
  itemKeyStyle,
  arrowStyle,
} from './officer-info-widget.style';
import { imgUrl } from 'utils/static-assets';


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

    const listInfo = [
      {
        key: '',
        value: `${age} year old (b. ${birthYear}), ${race.toLowerCase()}, ${gender.toLowerCase()}.`,
      },
      {
        key: 'Badge',
        value: badge,
      },
      {
        key: 'Rank',
        value: rank,
      },
      {
        key: 'Unit',
        value: unit,
        hasArrow: true,
      },
      {
        key: 'Career',
        value: `${appointedDate} — ${resignationDate || 'Present'}`,
      },
    ];

    return (
      <div style={ wrapperStyle }>
        <h1 style={ titleStyle }>{ fullName }</h1>
        <ul style={ listStyle }>
          {
            map(listInfo, (metric) => (
              <li style={ listItemStyle } key={ `item-${metric.key}` }>
                { metric.key && <span style={ itemKeyStyle }>{ metric.key }</span> }
                <span>{ metric.value }</span>
                { metric.hasArrow === true && (
                  <img src={ imgUrl('disclosure-indicator.svg') } style={ arrowStyle }/>
                ) }
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
  badge: '',
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
  badge: PropTypes.string,
  rank: PropTypes.string,
  unit: PropTypes.string,
  appointedDate: PropTypes.string.isRequired,
  resignationDate: PropTypes.string,
};
