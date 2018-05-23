import React, { Component, PropTypes } from 'react';

import { chunk } from 'lodash';

import NavigationButton from './navigation-button';
import Item from './item';
import StaticRadarChart from 'components/common/radar-chart';
import {
  wrapperStyle,
  fullRowStyle,
  officerNameStyle,
  visualTokenStyle,
  rankStyle,
  listWrapperStyle,
} from './officer-section.style';


export default class OfficerSection extends Component {
  render() {
    const { officer } = this.props;
    if (!officer) return null;

    const officerData = [
      {
        title: 'YEAR OF BIRTH',
        value: officer.birthYear || '',
        subValue: officer.yearOld ? `${officer.yearOld} years old` : '',
      }, {
        title: 'UNIT',
        value: officer.unitDescription || officer.unitName,
        extraComponent: <NavigationButton text='View Unit' to={ `/unit/${officer.unitName}/` }/>
      }, {
        title: 'RACE',
        value: officer.race,
      }, {
        title: 'ASSIGNED BEAT',
        value: officer.assignedBeat,
      }, {
        title: 'SEX',
        value: officer.gender,
      }, {
        title: 'ON DUTY',
        value: officer.onDuty ? 'Yes' : 'No',
      }, {
        title: 'CAREER',
        value: officer.careerDuration,
      }, {
        title: 'IN UNIFORM',
        value: officer.inUniform ? 'Yes' : 'No',
      }
    ];
    const rows = chunk(officerData, 2);

    const visualTokenConfig = officer.percentile ? {
      backgroundColor: officer.percentile.visualTokenBackground,
      data: officer.percentile.items,
    } : {};

    return (
      <div style={ wrapperStyle }>
        <div style={ fullRowStyle }>
          <div style={ visualTokenStyle }>
            <StaticRadarChart { ...visualTokenConfig }/>
          </div>
          <div style={ officerNameStyle }>
            <div style={ rankStyle }>Officer</div>
            <div className='test--officer-full-name'>{ officer.fullName }</div>
          </div>
          <NavigationButton
            text='View Profile'
            to={ `/officer/${officer.officerId}/` }
          />
        </div>
        <ul style={ listWrapperStyle }>
          {
            rows.map(
              ([firstItem, secondItem], index) => (
                <li key={ `row-${index}` }>
                  <Item { ...firstItem } isLeft={ true } hideBorder={ index === rows.length - 1 }/>
                  <Item { ...secondItem } hideBorder={ index === rows.length - 1 }/>
                </li>
              )
            )
          }
        </ul>
      </div>
    );
  }
}

OfficerSection.propTypes = {
  officer: PropTypes.object,
};
