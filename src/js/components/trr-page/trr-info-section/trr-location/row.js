import PropTypes from 'prop-types';
import React from 'react';

import style from './row.sass';


export default function Row(props) {
  const { title, value } = props;

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

Row.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
