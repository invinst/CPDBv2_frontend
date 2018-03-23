import React, { Component, PropTypes } from 'react';

import {
  dateHeaderStyle,
  headerWrapperStyle,
  rankHeaderStyle,
  showingContentHeaderStyle,
  timelineStyle,
  unitHeaderStyle,
} from './timeline.style';

import Item from './item';


export default class Timeline extends Component {

  renderHeader() {
    return (
      <div style={ headerWrapperStyle }>
        <div style={ rankHeaderStyle }>RANK</div>
        <div style={ unitHeaderStyle }>UNIT</div>
        <div style={ showingContentHeaderStyle }>SHOWING</div>
        <div style={ dateHeaderStyle }>DATE</div>
      </div>
    );
  }

  renderItems() {
    const { items } = this.props;

    return (
      <div>
        {
          items.map((item, index) => {
            if (index < items.length - 1) {
              if (items[index + 1].kind === 'UNIT_CHANGE' || items[index + 1].kind === 'JOINED') {
                return <Item item={ item } key={ index } hasBorderBottom={ false } />;
              }
            }
            else if (index === items.length - 1) {
              return <Item item={ item } key={ index } hasBorderBottom={ false } />;
            }

            return <Item item={ item } key={ index } hasBorderBottom={ true } />;
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div style={ timelineStyle }>
        { this.renderHeader() }
        { this.renderItems() }
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array
};
