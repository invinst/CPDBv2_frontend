import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import moment from 'moment';

import SummaryField from './summary-field';
import ViewUnitProfileButton from './view-unit-profile-button';
import {
  wrapperStyle, fieldsWrapperStyle, unitWrapperStyle, unitLabelStyle, unitValueStyle, lastFieldStyle
} from './summary-section.style';


export default class SummarySection extends Component {
  summaryFields() {
    const { rank, dateOfAppt, race, gender, badge } = this.props.officerSummary;
    return [
      ['Rank', rank],
      ['Date of Appt.',
        moment(dateOfAppt).format('ll').toUpperCase(),
        `${moment().year() - moment(dateOfAppt).year()} year veteran`],
      ['Badge', badge],
      ['Race', race],
      ['2016 Salary', 'DATA NOT READY'],
      ['Sex', gender]
    ];
  }



  render() {
    const { unitName } = this.props.officerSummary;
    const summaryFields = this.summaryFields();

    return (
      <div style={ wrapperStyle }>
        <div style={ unitWrapperStyle }>
          <span className='test--field-unit-label' style={ unitLabelStyle }>Unit</span>
          <span className='test--field-unit-value' style={ unitValueStyle }>{ unitName }</span>
          <ViewUnitProfileButton unitName={ unitName }/>
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
  officerSummary: PropTypes.object
};

SummarySection.defaultProps = {
  officerSummary: {}
};
