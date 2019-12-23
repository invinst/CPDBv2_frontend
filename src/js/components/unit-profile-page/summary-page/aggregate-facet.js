import PropTypes from 'prop-types';
import React from 'react';
import { map } from 'lodash';

import {
  wrapperStyle, aggregateNameStyle, entryStyle, countStyle, nameStyle, sustainedCountStyle,
} from './aggregate-facet.style';


export default function AggregateFacet(props) {
  const { name, entries } = props;

  return (
    <div className='test--aggregate-facet' style={ wrapperStyle }>
      <div className='test--aggregate-facet-name' style={ aggregateNameStyle }>{ name.toUpperCase() }</div>
      <div>
        {
          map(entries, ({ count, sustainedCount, name }, index) => {
            return (
              <div style={ entryStyle(index === 0) } key={ index }>
                <span className='test--entry-count' style={ countStyle }>{ count }</span>
                <span className='test--entry-sustained-count'
                  style={ sustainedCountStyle(sustainedCount) }>{ sustainedCount }</span>
                <span className='test--entry-name' style={ nameStyle }>{ name }</span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

AggregateFacet.propTypes = {
  name: PropTypes.string,
  entries: PropTypes.array,
};
