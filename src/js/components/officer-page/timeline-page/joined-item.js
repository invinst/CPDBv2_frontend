import React, { PropTypes, Component } from 'react';

import { joinedTextStyle, dateStyle, joinedDescriptionStyle } from './joined-item.style';

export default class JoinedItem extends Component {
  render() {
    const { item, flashRatio } = this.props;
    const { date } = item;
    return (
      <div>
        <span style={ joinedTextStyle }>Joined</span>
        <span style={ dateStyle }>{ date }</span>
        <span style={ joinedDescriptionStyle(flashRatio) }>Joined CPD</span>
      </div>
    );
  }
}

JoinedItem.propTypes = {
  item: PropTypes.object,
  flashRatio: PropTypes.number
};
