import React, { Component, PropTypes } from 'react';

import { chunk } from 'lodash';

import Item from './item';
import LinkItem from './link-item';
import style from './officer-section.sass';
import OfficerRow from './officer-row';


export default class OfficerSection extends Component {
  renderItem(item) {
    const ItemComponent = item.to ? LinkItem : Item;
    return <ItemComponent { ...item } />;
  }

  render() {
    const { officer } = this.props;
    if (!officer) return null;

    const officerData = [
      {
        title: 'year of birth',
        value: officer.birthYear || '',
        subValue: officer.yearOld ? `${officer.yearOld} years old` : '',
      }, {
        title: 'unit',
        value: officer.unitDescription || officer.unitName,
        to: `/unit/${officer.unitName}/`,
        navigationText: 'View Unit',
      }, {
        title: 'race',
        value: officer.race,
      }, {
        title: 'assigned beat',
        value: officer.assignedBeat,
      }, {
        title: 'sex',
        value: officer.gender,
      }, {
        title: 'on duty',
        value: officer.onDuty ? 'Yes' : 'No',
      }, {
        title: 'career',
        value: officer.careerDuration,
      }, {
        title: 'in uniform',
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
        <ul className='officer-section-list'>
          {
            rows.map(
              ([firstItem, secondItem], index) => (
                <li className='officer-section-row' key={ `row-${index}` }>
                  { this.renderItem(firstItem) }
                  { this.renderItem(secondItem) }
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
