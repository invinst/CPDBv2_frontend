import React, { PropTypes } from 'react';
import { map } from 'lodash';

import { wrapperStyle, countStyle, sustainedCountStyle } from './complaint-aggregate-section.style';
import AggregateFacet from './aggregate-facet';


export default function ComplaintAggregateSection(props) {
  const { count, sustainedCount, facets } = props;
  return (
    <div style={ wrapperStyle }>
      <span style={ countStyle } className='test--complaint-aggregate-status'>
        { `${count} complaint records (CRs), ` }
        <span style={ sustainedCountStyle }>{ `${sustainedCount} sustained` }</span>
      </span>
      { map(facets, ({ name, entries }, index) => (
        <AggregateFacet name={ name } entries={ entries } key={ index }/>
      )) }
    </div>
  );
}

ComplaintAggregateSection.propTypes = {
  count: PropTypes.number,
  sustainedCount: PropTypes.number,
  facets: PropTypes.array,
};
