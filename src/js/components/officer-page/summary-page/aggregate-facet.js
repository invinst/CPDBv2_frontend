import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import AggregateRow from './aggregate-row';
import {
  wrapperStyle, aggregateNameStyle, whiteSleeveStyle
} from './aggregate-facet.style';


export default class AggregateFacet extends Component {
  render() {
    const { name, entries, startYear } = this.props;
    const facetName = name;

    return (
      <div className='test--aggregate-facet' style={ wrapperStyle }>
        <div className='test--aggregate-facet-name' style={ aggregateNameStyle }>{ name.toUpperCase() }</div>
        <div style={ whiteSleeveStyle }/>
        <div>
          {
            map(
              entries,
              ({ count, sustainedCount, name, items }, ind) => (
                <AggregateRow
                  facetName={ facetName }
                  name={ name }
                  count={ count }
                  sustainedCount={ sustainedCount }
                  key={ `aggr-row-${ind}` }
                  items={ items }
                  startYear={ startYear }
                />
              )
            )
          }
        </div>
      </div>
    );
  }
}

AggregateFacet.propTypes = {
  name: PropTypes.string,
  entries: PropTypes.array,
  aggregateFacets: PropTypes.array,
  startYear: PropTypes.number
};
