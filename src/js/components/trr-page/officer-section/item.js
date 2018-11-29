import React, { Component, PropTypes } from 'react';

import style from './item.sass';


export default class Item extends Component {
  render() {
    const { title, value, subValue } = this.props;

    return (
      <div className={ style.item }>
        <div className='item-title'>
          { title }
        </div>
        <div className='item-value'>
          { value }
          { subValue && <span className='item-sub-value'>{ subValue }</span> }
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  subValue: PropTypes.string,
};
