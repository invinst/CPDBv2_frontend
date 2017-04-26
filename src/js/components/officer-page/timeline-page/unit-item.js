import React, { PropTypes, Component } from 'react';

import { unitTextStyle, dateStyle, descriptionStyle } from './unit-item.style';

export default class UnitItem extends Component {
  render() {
    const { item, flashRatio } = this.props;
    const { date, unitName } = item;
    return (
      <div>
        <span style={ unitTextStyle }>Unit Change</span>
        <span style={ dateStyle }>{ date }</span>
        <span style={ descriptionStyle(flashRatio) }>Assigned to Unit { unitName }</span>
      </div>
    );
  }
}

UnitItem.propTypes = {
  item: PropTypes.object,
  flashRatio: PropTypes.number
};
