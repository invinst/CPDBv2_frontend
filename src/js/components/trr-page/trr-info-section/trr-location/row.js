import React, { Component, PropTypes } from 'react';

import style from './row.sass';


export default class Row extends Component {
  render() {
    const { title, value } = this.props;

    return (
      <div className={ style.trrLocationRow }>
        <div className='trr-location-row-title'>
          { title }
        </div>
        <div className='trr-location-row-value'>
          { value }
        </div>
      </div>
    );
  }
}

Row.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
