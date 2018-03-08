import React, { Component, PropTypes } from 'react';

import { yearOldStyle } from './year-old.style';
import { getThisYear } from 'utils/date';


export default class YearOld extends Component {
  render() {
    const { birthYear } = this.props;

    return (
      <span className='test--year-old' style={ yearOldStyle }>
        { `${getThisYear() - birthYear } years old` }
      </span>
    );
  }
}

YearOld.propTypes = {
  birthYear: PropTypes.number,
};
