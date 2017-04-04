import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import AggregateFacet from './aggregate-facet';
import { wrapperStyle, titleStyle, titleFadedStyle, countStyle } from './aggregate-section.style';


export default class AggregateSection extends Component {
  render() {
    const { aggregateFacets, title, fadedTitle, count } = this.props;

    return (
      <div style={ wrapperStyle }>
        <span className='test--aggregate-title' style={ titleStyle }>{ title }</span>
        <span className='test--aggregate-faded-title' style={ titleFadedStyle }>{ fadedTitle }</span>
        <div className='test--aggregate-count' style={ countStyle }>{ count }</div>
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
  fadedTitle: PropTypes.string,
  count: PropTypes.number
};
