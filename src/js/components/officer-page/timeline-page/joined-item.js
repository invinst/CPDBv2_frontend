import React, { PropTypes, Component } from 'react';

import { unitTextStyle, dateStyle } from './joined-item.style';

export default class JoinedItem extends Component {
  render() {
    const { item } = this.props;
    const { date } = item;
    return (
      <div>
        <span style={ unitTextStyle }>Joined</span>
        <span style={ dateStyle }>{ date }</span>
      </div>
    );
  }
}

JoinedItem.propTypes = {
  item: PropTypes.object
};
