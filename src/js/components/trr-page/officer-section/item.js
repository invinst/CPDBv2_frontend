import React, { PropTypes } from 'react';

import style from './item.sass';


export default function Item(props) {
  const { title, value, subValue } = props;

  return (
    <div className={ style.item }>
      <div className='item-title'>
        { title }
      </div>
      <div className='item-value'>
        <div className='value'>{ value }</div>
        { subValue && <div className='item-sub-value'>{ subValue }</div> }
      </div>
    </div>
  );
}

Item.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  subValue: PropTypes.string,
};
