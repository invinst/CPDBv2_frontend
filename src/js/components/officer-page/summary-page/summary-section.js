import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import moment from 'moment';

import SummaryField from './summary-field';
import ViewUnitProfileButton from './view-unit-profile-button';
import {
  wrapperStyle, fieldsWrapperStyle, unitWrapperStyle, unitLabelStyle, unitValueStyle, lastFieldStyle
} from './summary-section.style';


export default class SummarySection extends Component {
  formatCareerDate(inputDate) {
    return moment(inputDate).format('ll').toUpperCase();
  }

  careerDuration() {
    // TODO: uncomment this once resignation data is available
    // const { dateOfAppt, dateOfResignation } = this.props.officerSummary;
    // const careerStart = this.formatCareerDate(dateOfAppt);
    // const careerEnd = dateOfResignation ? this.formatCareerDate(dateOfResignation) : 'Present';
    // return `${careerStart}—${careerEnd}`;

    const { dateOfAppt } = this.props.officerSummary;
    const careerStart = this.formatCareerDate(dateOfAppt);
    return careerStart;
  }

  careerDescription() {
    // TODO: uncomment this once resignation data is available
    // const { dateOfAppt, agency } = this.props.officerSummary;
    // const yearsSinceAppt = moment().year() - moment(dateOfAppt).year();
    // const yearText = !agency || yearsSinceAppt === 1 ? 'year' : 'years';
    // const agencyText = agency ? `with ${agency}` : 'veteran';
    // return `${yearsSinceAppt} ${yearText} ${agencyText}`;
    return '';
  }

  summaryFields() {
    const { rank, race, gender, badge } = this.props.officerSummary;

    return [
      ['Rank', rank],
      ['Date of Appt.', this.careerDuration(), this.careerDescription()],
      ['Badge', badge],
      ['Race', race],
      ['2016 Salary', 'DATA NOT READY'],
      ['Sex', gender]
    ];
  }

  render() {
    const { officerSummary, openPoliceUnitPage } = this.props;
    const { unitName } = officerSummary;
    const summaryFields = this.summaryFields();

    return (
      <div style={ wrapperStyle }>
        <div style={ unitWrapperStyle }>
          <span className='test--field-unit-label' style={ unitLabelStyle }>Unit</span>
          <span className='test--field-unit-value' style={ unitValueStyle }>{ unitName }</span>
          <ViewUnitProfileButton unitName={ unitName } onClick={ openPoliceUnitPage }/>
        </div>
        <div style={ fieldsWrapperStyle }>
          { map(summaryFields, ([label, value, description], ind) => {
            const numberOfFields = summaryFields.length;
            let isLastRowItem = numberOfFields % 2 == 0 ? ind > numberOfFields - 3 : ind > numberOfFields - 2;
            return (<SummaryField style={ isLastRowItem ? lastFieldStyle : {} }
              label={ label } value={ value } key={ ind } description={ description }/>);
          }) }
        </div>
      </div>
    );
  }
}

SummarySection.propTypes = {
  officerSummary: PropTypes.object,
  openPoliceUnitPage: PropTypes.func
};

SummarySection.defaultProps = {
  officerSummary: {}
};
