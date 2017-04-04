import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import {
  wrapperStyle, aggregateNameStyle, whiteSleeveStyle, entryStyle, countStyle, nameStyle
} from './aggregate-facet.style';


export default class AggregateFacet extends Component {
  render() {
    const { name, entries } = this.props;

    return (
      <div className='test--aggregate-facet' style={ wrapperStyle }>
        <div className='test--aggregate-facet-name' style={ aggregateNameStyle }>{ name.toUpperCase() }</div>
        <div style={ whiteSleeveStyle }/>
        <div>
          {
            map(entries, ({ name, count }, ind) => {
              return (
                <div style={ entryStyle } key={ ind }>
                  <span className='test--entry-count' style={ countStyle }>{ count }</span>
                  <span className='test--entry-name' style={ nameStyle }>{ name }</span>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

AggregateFacet.propTypes = {
  name: PropTypes.string,
  entries: PropTypes.array
};
