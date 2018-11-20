import React, { Component, PropTypes } from 'react';

import { chunk } from 'lodash';

import Item from './item';
import LinkItem from './link-item';
import style from './officer-section.sass';
import OfficerRow from './officer-row';


export default class OfficerSection extends Component {
  renderItem(item, isLeft, hideBorder) {
    const ItemComponent = item.to ? LinkItem : Item;
    return <ItemComponent { ...item } isLeft={ isLeft } hideBorder={ hideBorder }/>;
  }

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
        to: `/unit/${officer.unitName}/`,
        navigationText: 'View Unit',
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

    return (
      <div className={ style.officerSection }>
        <OfficerRow
          percentile={ officer.percentile }
          fullName={ officer.fullName }
          officerId={ officer.officerId }
        />
        <ul className='list-wrapper'>
          {
            rows.map(
              ([firstItem, secondItem], index) => (
                <li key={ `row-${index}` }>
                  { this.renderItem(firstItem, true, index === rows.length - 1) }
                  { this.renderItem(secondItem, false, index === rows.length - 1) }
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
