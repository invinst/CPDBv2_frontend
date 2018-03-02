import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import SummaryField from './summary-field';
import ViewUnitProfileButton from './view-unit-profile-button';
import { officerNameStyle, wrapperStyle } from './summary-section.style';
import Salary from './salary';
import YearOld from './year-old';


export default class SummarySection extends Component {
  summaryFields() {
    const { rank, race, gender, badge, careerDuration, unitName, birthYear } = this.props.officerSummary;
    const { openPoliceUnitPage } = this.props;
    const baseSalary = 'DATA NOT READY';

    return [
      ['Year of Birth', birthYear, (<YearOld birthYear={ birthYear } key='Year of Birth'/>)],
      ['Race', race],
      ['Sex', gender],
      ['Badge', badge],
      ['Rank', rank, (<Salary salary={ baseSalary } key='Rank'/>)],
      ['Unit', unitName, (<ViewUnitProfileButton unitName={ unitName } onClick={ openPoliceUnitPage } key='Unit'/>)],
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
  officerSummary: PropTypes.object,
  openPoliceUnitPage: PropTypes.func,
  officerName: PropTypes.string,
};

SummarySection.defaultProps = {
  officerSummary: {}
};
