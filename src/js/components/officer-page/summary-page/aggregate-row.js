import React, { PropTypes, Component } from 'react';

import SparklinesContainer from 'containers/officer-page/officer-sparkline-container';
import {
  entryStyle, countStyle, nameStyle, sustainedCountStyle
} from './aggregate-row.style';


export default class AggregateRow extends Component {
  render() {
    const { facetName, name, count, sustainedCount, items, startYear } = this.props;
    const timelineEventQuery = facetName ? { [facetName]: name } : {};
    return (
      <div style={ entryStyle }>
        <span className='test--entry-name' style={ nameStyle }>{ name }</span>
        <span className='test--entry-count' style={ countStyle }>{ count }</span>
        <span className='test--entry-sustained-count' style={ sustainedCountStyle(sustainedCount) }>
          { sustainedCount }
        </span>
        { items && (
          <SparklinesContainer timelineEventQuery={ timelineEventQuery } data={ items } startYear={ startYear }/>
        ) }
      </div>
    );
  }
}

AggregateRow.propTypes = {
  name: PropTypes.string,
  facetName: PropTypes.string,
  count: PropTypes.number,
  sustainedCount: PropTypes.number,
  items: PropTypes.array,
  startYear: PropTypes.number,
};
