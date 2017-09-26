import React, { PropTypes, Component } from 'react';

import SparklinesContainer from 'containers/officer-page/officer-sparkline-container';
import {
  entryStyle, countStyle, nameStyle, sustainedCountStyle
} from './aggregate-row.style';


export default class AggregateRow extends Component {
  render() {
    const { name, count, sustainedCount, items } = this.props;
    return (
      <div style={ entryStyle }>
        <span className='test--entry-name' style={ nameStyle }>{ name }</span>
        <span className='test--entry-count' style={ countStyle }>{ count }</span>
        <span className='test--entry-sustained-count' style={ sustainedCountStyle(sustainedCount) }>
          { sustainedCount }
        </span>
        { items && (
          <SparklinesContainer data={ items }/>
        )}
      </div>
    );
  }
}

AggregateRow.propTypes = {
  name: PropTypes.string,
  count: PropTypes.number,
  sustainedCount: PropTypes.number,
  items: PropTypes.array
};
