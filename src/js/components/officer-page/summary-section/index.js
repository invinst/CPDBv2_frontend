import React, { Component, PropTypes } from 'react';
import { map, get } from 'lodash';

import SummaryField from './summary-field';
import ViewUnitProfileButton from './view-unit-profile-button';
import { officerNameStyle, wrapperStyle } from './summary-section.style';
import Salary from './salary';
import YearOld from './year-old';
import HistoricBadges from './historic-badges';
import { POPUP_NAMES } from 'utils/constants';


export default class SummarySection extends Component {
  summaryFields() {
    const {
      rank,
      race,
      gender,
      badge,
      historicBadges,
      careerDuration,
      unitName,
      unitDescription,
      birthYear,
      currentSalary
    } = this.props.officerSummary;
    const { openPoliceUnitPage, popup, pathName } = this.props;

    return [
      ['Year of Birth', birthYear, <YearOld birthYear={ birthYear } key='Year of Birth'/>],
      ['Race', race],
      ['Sex', gender],
      ['Badge', badge, <HistoricBadges historicBadges={ historicBadges } key='Historic Badges'/>],
      ['Rank', rank, currentSalary !== null ? (
        <Salary
          salary={ currentSalary }
          key='Rank'
          popup={ get(popup, POPUP_NAMES.OFFICER.SALARY) }
          pathName={ pathName }
        />
      ) : null],
      ['Unit', unitDescription || unitName, (
        <ViewUnitProfileButton unitName={ unitName } onClick={ openPoliceUnitPage } key='Unit'/>
      )],
      ['Career', careerDuration],
    ];
  }

  render() {
    const { officerName } = this.props;
    const summaryFields = this.summaryFields();

    return (
      <div style={ wrapperStyle }>
        <div className='test--summary-section-officer-name' style={ officerNameStyle }>
          { officerName }
        </div>
        {
          map(summaryFields, ([label, value, rightChild], ind) => {
            return (
              <SummaryField
                label={ label } value={ value } key={ ind }
              >
                { rightChild }
              </SummaryField>
            );
          })
        }
      </div>
    );
  }
}

SummarySection.propTypes = {
  officerSummary: PropTypes.shape({
    rank: PropTypes.string,
    race: PropTypes.string,
    gender: PropTypes.string,
    badge: PropTypes.string,
    historicBadges: PropTypes.arrayOf(PropTypes.string),
    careerDuration: PropTypes.string,
    unitName: PropTypes.string,
    unitDescription: PropTypes.string,
    birthYear: PropTypes.number,
    currentSalary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  openPoliceUnitPage: PropTypes.func,
  officerName: PropTypes.string,
  popup: PropTypes.object,
  pathName: PropTypes.string,
};

SummarySection.defaultProps = {
  officerSummary: {}
};
