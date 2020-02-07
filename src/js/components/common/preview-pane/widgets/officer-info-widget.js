import React, { Component, PropTypes } from 'react';
import { map, compact, lowerCase, isEmpty } from 'lodash';

import {
  wrapperStyle,
  titleStyle,
  listStyle,
  listItemStyle,
  itemKeyStyle,
  itemValueStyle,
  clearfixStyle,
} from './officer-info-widget.style';


export default class OfficerInfoWidget extends Component {
  render() {
    const {
      fullName,
      age,
      race,
      gender,
      badge,
      rank,
      unit,
      appointedDate,
      resignationDate,
    } = this.props;

    const raceString = race ? lowerCase(race) : null;
    const genderString = gender ? lowerCase(gender) : null;
    const geographicInfo = compact([age, raceString, genderString]);

    const listInfo = [
      {
        key: '',
        value: !isEmpty(geographicInfo) ? `${geographicInfo.join(', ')}.` : null,
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
        value: unit.description || unit.unitName,
        title: unit.description,
      },
      {
        key: 'Career',
        value: `${appointedDate || 'Unknown'} — ${resignationDate || 'Present'}`,
      },
    ];

    return (
      <div style={ wrapperStyle }>
        <h1 className='test--officer-name' style={ titleStyle }>{ fullName }</h1>
        <ul style={ listStyle }>
          {
            map(listInfo, (metric) => metric.value ? (
              <li style={ listItemStyle } key={ `item-${metric.key}` }>
                { metric.key && <div style={ itemKeyStyle }>{ metric.key }</div> }
                <div
                  title={ metric.title }
                  style={ itemValueStyle(!!metric.key) }
                >
                  { metric.value }
                </div>
                <div style={ clearfixStyle }/>
              </li>
            ) : null)
          }
        </ul>
      </div>
    );
  }
}

OfficerInfoWidget.defaultProps = {
  unit: {},
  appointedDate: null,
  resignationDate: null,
};

OfficerInfoWidget.propTypes = {
  fullName: PropTypes.string.isRequired,
  age: PropTypes.number,
  race: PropTypes.string,
  gender: PropTypes.string,
  badge: PropTypes.string,
  rank: PropTypes.string,
  unit: PropTypes.shape({
    id: PropTypes.number,
    unitName: PropTypes.string,
    description: PropTypes.string,
  }),
  appointedDate: PropTypes.string.isRequired,
  resignationDate: PropTypes.string,
};
