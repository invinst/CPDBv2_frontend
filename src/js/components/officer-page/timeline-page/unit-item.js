import React, { PropTypes, Component } from 'react';

import { unitTextStyle, dateStyle, descriptionStyle } from './unit-item.style';

export default class UnitItem extends Component {
  render() {
    const { item, flashRatio } = this.props;
    const { date, unitName } = item;
    return (
      <div>
        <span className='test--unit-item-kind' style={ unitTextStyle }>Unit Change</span>
        <span className='test--unit-item-date' style={ dateStyle }>{ date }</span>
        <span className='test--unit-item-description'
          style={ descriptionStyle(flashRatio) }>Assigned to Unit { unitName }</span>
      </div>
    );
  }
}

UnitItem.propTypes = {
  item: PropTypes.object,
  flashRatio: PropTypes.number
};
