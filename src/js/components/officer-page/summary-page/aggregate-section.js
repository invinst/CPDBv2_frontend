import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import AggregateFacet from './aggregate-facet';
import AggregateRow from './aggregate-row';
import { wrapperStyle, titleStyle, sustainedTextStyle, sectionHeaderStyle } from './aggregate-section.style';


export default class AggregateSection extends Component {
  render() {
    const { aggregateFacets, title, count, sustainedCount } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div className='test--aggregate-title' style={ sectionHeaderStyle }>
          <span style={ titleStyle }>{ `${count} ${title}, ` }</span>
          <span style={ sustainedTextStyle }>{ `${sustainedCount} sustained` }</span>
        </div>
        <AggregateRow name='Total' count={ count } sustainedCount={ sustainedCount } />
        { map(aggregateFacets, ({ name, entries }, ind) => (
          <AggregateFacet name={ name } entries={ entries } key={ ind }/>
        )) }
      </div>
    );
  }
}

AggregateSection.propTypes = {
  aggregateFacets: PropTypes.array,
  title: PropTypes.string,
  count: PropTypes.number,
  sustainedCount: PropTypes.number
};
