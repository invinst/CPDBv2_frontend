import React, { PropTypes, Component } from 'react';

import {
  showingStyle,
  wrapperShowingStyle,
} from './empty.style';


export default class Empty extends Component {

  render() {
    const { hasBorderBottom, baseStyles } = this.props;
    const { baseShowingStyle, baseWrapperShowingStyle } = baseStyles;

    return (
      <span style={ { ...baseWrapperShowingStyle, ...wrapperShowingStyle } } className='test--empty-item-showing'>
        <div style={ { ...baseShowingStyle(hasBorderBottom), ...showingStyle } }/>
      </span>
    );
  }
}

Empty.propTypes = {
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
};
