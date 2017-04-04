import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import SummaryField from './summary-field';
import { wrapperStyle, whiteSleeveStyle } from './summary-section.style';


export default class SummarySection extends Component {
  summaryFields() {
    const { unitName, rank, dateOfAppt, race, gender, badge } = this.props.officerSummary;
    return [
      ['Unit', unitName],
      ['Date of Appt.', dateOfAppt],
      ['Rank', rank],
      ['Race', race],
      ['Badge', badge],
      ['Sex', gender]
    ];
  }

  render() {
    return (
      <div style={ wrapperStyle }>
        <div style={ whiteSleeveStyle }/>
        { map(this.summaryFields(), ([label, value], ind) => (
          <SummaryField label={ label } value={ value } key={ ind }/>
        )) }
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
