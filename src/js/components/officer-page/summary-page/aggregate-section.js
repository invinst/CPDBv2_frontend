import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';
import moment from 'moment';

import AggregateFacet from './aggregate-facet';
import AggregateRow from './aggregate-row';
import { wrapperStyle, titleStyle, sustainedTextStyle, sectionHeaderStyle } from './aggregate-section.style';


export default class AggregateSection extends Component {
  render() {
    const { aggregateFacets, title, count, sustainedCount, complaintsByYear, dateOfAppt } = this.props;
    const startYear = moment(dateOfAppt).year();
    return (
      <div style={ wrapperStyle }>
        <div className='test--aggregate-title' style={ sectionHeaderStyle }>
          <span style={ titleStyle }>{ `${count} ${title}, ` }</span>
          <span style={ sustainedTextStyle }>{ `${sustainedCount} sustained` }</span>
        </div>
        <AggregateRow
          name='Total'
          count={ count }
          sustainedCount={ sustainedCount }
          items={ complaintsByYear }
          startYear={ startYear }
        />
        { map(aggregateFacets, ({ name, entries }, ind) => (
          <AggregateFacet name={ name } entries={ entries } key={ ind } startYear={ startYear }/>
        )) }
      </div>
    );
  }
}

AggregateSection.propTypes = {
  aggregateFacets: PropTypes.array,
  title: PropTypes.string,
  count: PropTypes.number,
  sustainedCount: PropTypes.number,
  complaintsByYear: PropTypes.array,
  dateOfAppt: PropTypes.string
};
