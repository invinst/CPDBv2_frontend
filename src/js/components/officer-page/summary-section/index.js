import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { map, get, clone, reduce, isEmpty } from 'lodash';

import SummaryField from './summary-field';
import ViewUnitProfileButton from './view-unit-profile-button';
import Salary from './salary';
import YearOld from './year-old';
import { POPUP_NAMES } from 'utils/constants';
import styles from './summary-section.sass';
import TortureBrady from './tortureBrady';


export default class SummarySection extends Component {
  badges() {
    const { badge, historicBadges } = this.props.officerSummary;
    let allBadges = clone(historicBadges) || [];
    if (badge)
      allBadges.unshift(<span className='current-badge' key='current-badge'>{ badge }</span>);

    if (isEmpty(allBadges))
      allBadges.unshift('Unknown');

    return (
      <span className='badges'>
        { reduce(allBadges, (prev, curr) => [prev, ', ', curr]) }
      </span>
    );
  }

  summaryFields() {
    const {
      rank,
      race,
      gender,
      careerDuration,
      unitName,
      unitDescription,
      birthYear,
      currentSalary,
    } = this.props.officerSummary;
    const { popup, pathName } = this.props;

    return [
      ['Year of Birth', birthYear, <YearOld birthYear={ birthYear } key='Year of Birth'/>],
      ['Race', race],
      ['Sex', gender],
      ['Badge', this.badges()],
      ['Rank', rank, currentSalary !== null ? (
        <Salary
          salary={ currentSalary }
          key='Rank'
          popup={ get(popup, POPUP_NAMES.OFFICER.SALARY) }
          pathName={ pathName }
        />
      ) : null],
      ['Unit', unitDescription || unitName, (
        <ViewUnitProfileButton unitName={ unitName } key='Unit'/>
      )],
      ['Career', careerDuration],
      ['Brady', gender, <TortureBrady popup={ get(popup, POPUP_NAMES.OFFICER.BRADY) }/>],
      ['Torture', gender]
    ];
  }

  render() {
    const { officerName } = this.props;
    const summaryFields = this.summaryFields();

    return (
      <div className={ styles.summarySection }>
        <div className='summary-section-officer-name'>
          { officerName }
        </div>
        {
          map(summaryFields, ([label, value, rightChild], ind) => {
            return (
              <SummaryField label={ label } value={ value } key={ `summary-field-${ind}` }>
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
  officerName: PropTypes.string,
  popup: PropTypes.object,
  pathName: PropTypes.string,
};

SummarySection.defaultProps = {
  officerSummary: {},
};
