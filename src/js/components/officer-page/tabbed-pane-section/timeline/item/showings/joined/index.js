import React, { PropTypes, Component } from 'react';

import {
  showingStyle,
  dateStyle,
  wrapperShowingStyle,
  joinStyle,
} from './joined.style';


export default class Joined extends Component {

  render() {
    const { item, hasBorderBottom, baseStyles } = this.props;
    const {
      baseWrapperShowingStyle,
      baseShowingStyle,
      baseDateStyle,
    } = baseStyles;
    const unitString = item.unitName === 'Unassigned' ? '' : `with ${item.unitName} `;

    return (
      <span style={ { ...baseWrapperShowingStyle, ...wrapperShowingStyle } }>
        <span style={ { ...baseShowingStyle(hasBorderBottom), ...showingStyle } }>
          <span style={ joinStyle } className='test--joined-item-join'>
            Joined Chicago Police Department { unitString }as a {item.rank}
          </span>
          <span style={ { ...baseDateStyle, ...dateStyle } } className='test--joined-item-date'>{ item.date }</span>
        </span>
      </span>
    );
  }
}

Joined.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
};
