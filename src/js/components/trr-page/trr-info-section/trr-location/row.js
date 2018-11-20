import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import style from './row.sass';


export default class Row extends Component {
  render() {
    const { title, value, hideBorder } = this.props;

    return (
      <div className={ cx(style.trrLocationRow, { border: !hideBorder }) }>
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
  hideBorder: PropTypes.bool,
};

Row.defaultProps = {
  hideBorder: false,
};
