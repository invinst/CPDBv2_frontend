import React, { PropTypes, Component } from 'react';

import { joinedTextStyle, dateStyle, joinedDescriptionStyle } from './joined-item.style';

export default class JoinedItem extends Component {
  render() {
    const { item, flashRatio } = this.props;
    const { date } = item;
    return (
      <div>
        <span className='test--joined-item-kind' style={ joinedTextStyle }>Joined</span>
        <span className='test--joined-item-date' style={ dateStyle }>{ date }</span>
        <span className='test--joined-item-description' style={ joinedDescriptionStyle(flashRatio) }>Joined CPD</span>
      </div>
    );
  }
}

JoinedItem.propTypes = {
  item: PropTypes.object,
  flashRatio: PropTypes.number
};

JoinedItem.defaultProps = {
  item: {}
};
