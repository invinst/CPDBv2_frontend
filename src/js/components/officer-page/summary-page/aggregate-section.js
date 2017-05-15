import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import AggregateFacet from './aggregate-facet';
import {
  wrapperStyle, titleStyle, titleFadedStyle, countStyle, blackCircleStyle, totalTextStyle,
  orangeCircleStyle, sustainedTextStyle, sustainedCountStyle
} from './aggregate-section.style';


export default class AggregateSection extends Component {
  render() {
    const { aggregateFacets, title, fadedTitle, count, sustainedCount } = this.props;

    return (
      <div style={ wrapperStyle }>
        <span className='test--aggregate-title' style={ titleStyle }>{ title }</span>
        <span className='test--aggregate-faded-title' style={ titleFadedStyle }>{ fadedTitle }</span>
        <span style={ blackCircleStyle } />
        <span style={ totalTextStyle }>Total</span>
        <span style={ orangeCircleStyle } />
        <span style={ sustainedTextStyle }>Sustained</span>
        <div>
          <div className='test--aggregate-count' style={ countStyle }>{ count }</div>
          <div className='test--aggregate-sustained-count' style={ sustainedCountStyle }>{ sustainedCount }</div>
        </div>
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
  count: PropTypes.number,
  sustainedCount: PropTypes.number
};
