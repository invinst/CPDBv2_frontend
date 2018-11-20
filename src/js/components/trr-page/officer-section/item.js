import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import style from './item.sass';


export default class Item extends Component {
  render() {
    const { title, value, subValue, isLeft, hideBorder } = this.props;

    return (
      <div className={ cx(style.item, { left: isLeft, border: !hideBorder }) }>
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
  isLeft: PropTypes.bool,
  hideBorder: PropTypes.bool,
};

Item.defaultProps = {
  hideBorder: false,
};
